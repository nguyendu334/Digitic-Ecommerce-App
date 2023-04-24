const express = require('express');
const {
    createProduct,
    updateProduct,
    getaProducts,
    getAllProducts,
    deleteProduct,
    addToWishlist,
    rating,
    uploadImage,
    deleteImage,
} = require('../controllers/productCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { uploadPhotoProduct, productImgResize } = require('../middlewares/uploadImages');

const router = express.Router();

// Create product
router.post('/create-product', authMiddleware, isAdmin, createProduct);

// upload img
router.put(
    '/upload/',
    authMiddleware,
    isAdmin,
    uploadPhotoProduct.array('images', 10),
    productImgResize,
    uploadImage,
);

// add to wishlist
router.put('/wishlist', authMiddleware, addToWishlist);

// rating
router.put('/rating', authMiddleware, rating);

// Update product
router.put('/:id', authMiddleware, isAdmin, updateProduct);

// Delete product
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

// delete img
router.delete('/delete-image/:id', authMiddleware, isAdmin, deleteImage);

// get single product
router.get('/:id', getaProducts);

// Get all products
router.get('/', getAllProducts);

module.exports = router;
