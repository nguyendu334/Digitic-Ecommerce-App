const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Update user
router.put('/edit-user', authMiddleware, updateUser);

// Get all users
router.get('/all-users', getAllUsers);

// Get single user
router.get('/:id', authMiddleware, isAdmin, getSingleUser);

// Delete user
router.delete('/:id', authMiddleware, isAdmin, deleteUser);

// Block user
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);

// Unblock user
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);

// refresh token
router.post('/refresh', handleRefreshToken);

// logout
router.post('/logout', logoutUser);

// update password
router.put('/password', authMiddleware, updatePassword);

// forgot password
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
