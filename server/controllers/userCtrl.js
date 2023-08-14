const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uniqid = require('uniqid');

const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');

const validateMongoDbId = require('../utils/validateMongodbId');
const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshToken');
const sendEmail = require('./emailCtrl');

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

// user login
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

// login user
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== 'admin') throw new Error('You are not an admin');
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateUser = await User.findByIdAndUpdate(
            findAdmin.id,
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
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
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

// Save address
const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req?.body.address,
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

// get wishlist
const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findById(_id).populate('wishlist');
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

// user add to cart
const userCart = asyncHandler(async (req, res) => {
    const { productId, color, quantity, price } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        let newCart = await new Cart({
            userId: _id,
            productId,
            color,
            quantity,
            price,
        }).save();
        res.json(newCart);
    } catch (error) {
        throw new Error(error);
    }
});

// get User cart
const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const cart = await Cart.find({ userId: _id }).populate('productId').populate('color');
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

// remove product from cart
const removeProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId } = req.params;
    validateMongoDbId(_id);
    try {
        const deleteProductFromCart = await Cart.deleteOne({ userId: _id, _id: cartItemId });
        res.json(deleteProductFromCart);
    } catch (error) {
        throw new Error(error);
    }
});

// update quantity
const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId, newQuantity } = req.params;
    validateMongoDbId(_id);
    try {
        const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
        cartItem.quantity = newQuantity;
        cartItem.save();
        res.json(cartItem);
    } catch (error) {
        throw new Error(error);
    }
});

// Empty cart
const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndRemove({ orderedBy: user._id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

// Apply coupon
const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
        throw new Error('Invalid Coupon');
    }
    const user = await User.findOne({ _id });
    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id }).populate(
        'products.product',
    );
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
    await Cart.findOneAndUpdate({ orderedBy: user._id }, { totalAfterDiscount }, { new: true });
    res.json(totalAfterDiscount);
});

// Create order
const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        if (!COD) {
            throw new Error('Payment method is required');
        }
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderedBy: user._id });
        let finalAmout = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmout = userCart.totalAfterDiscount;
        } else {
            finalAmout = userCart.cartTotal;
        }
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: 'COD',
                amount: finalAmout,
                status: 'Cash On Delivery',
                created: Date.now(),
                currency: 'USD',
            },
            orderedBy: user._id,
            orderStatus: 'Cash on Delivery',
        }).save();
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } },
                },
            };
        });
        const updated = await Product.bulkWrite(update, {});
        res.json({
            message: 'Order created successfully',
        });
    } catch (error) {
        throw new Error(error);
    }
});

// get order
const getOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const userOrders = await Order.findOne({ orderedBy: _id })
            .populate('products.product')
            .populate('orderedBy')
            .exec();
        res.json(userOrders);
    } catch (error) {
        throw new Error(error);
    }
});

// get all order
const getAllOrder = asyncHandler(async (req, res) => {
    try {
        const userOrders = await Order.find()
            .populate('products.product')
            .populate('orderedBy')
            .exec();
        res.json(userOrders);
    } catch (error) {
        throw new Error(error);
    }
});

// get order by user id
const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const userOrders = await Order.findOne({ orderedBy: id })
            .populate('products.product')
            .populate('orderedBy')
            .exec();
        res.json(userOrders);
    } catch (error) {
        throw new Error(error);
    }
});

// Update order
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent: {
                    status: status,
                },
            },
            { new: true },
        );
        res.json(updateOrderStatus);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    registerUser,
    loginAdmin,
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
    getWishlist,
    saveAddress,
    userCart,
    getUserCart,
    removeProductFromCart,
    updateProductQuantityFromCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrder,
    getAllOrder,
    getOrderByUserId,
    updateOrderStatus,
};
