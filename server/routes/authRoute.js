const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);

// Update user
router.put('/edit-user', authMiddleware, updateUser);

// save address
router.put('/save-address', authMiddleware, saveAddress);

// Get all users
router.get('/all-users', getAllUsers);

// get wishlist
router.get('/wishlist', authMiddleware, getWishlist);

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
