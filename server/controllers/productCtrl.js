const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Product = require('../models/productModel');

// Create product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        await Product.findOneAndDelete(req.params.id);
        res.json('Product deleted successfully');
    } catch (error) {
        throw new Error(error);
    }
});

// get single product
const getaProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.json(products);
    } catch (error) {
        throw new Error(error);
    }
});

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        // Filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query.sort(sortBy);
        } else {
            query.sort('-createdAt');
        }

        // Limiting fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query.select(fields);
        } else {
            query.select('-__v');
        }

        // Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error('This page does not exist');
        }

        const products = await query;
        res.json(products);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createProduct, getaProducts, getAllProducts, updateProduct, deleteProduct };
