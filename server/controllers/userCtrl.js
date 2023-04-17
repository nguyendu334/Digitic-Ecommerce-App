const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const validateMongoDbId = require('../utils/validateMongodbId');
const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshToken');
const sendEmail = require('./emailCtrl');
const crypto = require('crypto');

// register user
const registerUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        res.status(400);
        throw new Error('User already exists');
    }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true },
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error('Invalid Credentials');
    }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new Error('No Refresh Token in Cookies');
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(' No Refresh token present in db or not matched');
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('There is something wrong with refresh token');
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});

// logout
const logoutUser = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new Error('No Refresh Token in Cookies');
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: '',
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
});

// update user
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body.firstname,
                lastname: req?.body.lastname,
                email: req?.body.email,
                mobile: req?.body.mobile,
            },
            { new: true },
        );
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find({});
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// get a single user
const getSingleUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id);
    try {
        const getUser = await User.findById(req.params.id);
        res.json(getUser);
    } catch (error) {
        throw new Error(error);
    }
});

// delete a single user
const deleteUser = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json('User deleted successfully');
    } catch (error) {
        throw new Error(error);
    }
});

// block a single user
const blockUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id);
    try {
        const blockUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                isBlocked: true,
            },
            { new: true },
        );
        res.json({
            message: 'User blocked successfully',
            blockUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// unblock a single user
const unBlockUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id);
    try {
        const blockUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                isBlocked: false,
            },
            { new: true },
        );
        res.json({
            message: 'User unblocked successfully',
            blockUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// update password
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword);
    } else {
        res.json(user);
        throw new Error('Please enter password');
    }
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        throw new Error('User not found with this email');
    }
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset your password: <a href='http://localhost:4000/api/user/reset-password/${token}'>Click here!</a>`;
        const data = {
            to: req.body.email,
            text: 'Hey',
            subject: 'Reset Password',
            html: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new Error('Token is invalid or has expired');
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logoutUser,
    updatePassword,
    forgotPassword,
    resetPassword,
};
