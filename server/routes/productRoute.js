const express = require('express');
const {
    createProduct,
    updateProduct,
    getaProducts,
    getAllProducts,
    deleteProduct,
} = require('../controllers/productCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create product
router.post('/create-product', authMiddleware, isAdmin, createProduct);

// Update product
router.put('/:id', authMiddleware, isAdmin, updateProduct);

// Delete product
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

// get single product
router.get('/:id', getaProducts);

// Get all products
router.get('/', getAllProducts);

module.exports = router;
