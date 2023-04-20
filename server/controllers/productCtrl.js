const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const fs = require('fs');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const validateMongoDbId = require('../utils/validateMongodbId');
const uploadImg = require('../utils/cloudinary');

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

// add to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const { _id } = req.user;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user?.wishlist?.find((item) => item.toString() == productId);
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishlist: productId },
                },
                { new: true },
            );
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishlist: productId },
                },
                { new: true },
            );
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});

// Rating
const rating = asyncHandler(async (req, res) => {
    const { productId, star, comment } = req.body;
    const { _id } = req.user;
    try {
        const product = await Product.findById(productId);
        const alreadyRated = product.rating.find(
            (item) => item.postedBy.toString() == _id.toString(),
        );
        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    rating: { $elemMatch: alreadyRated },
                },
                {
                    $set: { 'rating.$.star': star, 'rating.$.comment': comment },
                },
                { new: true },
            );
        } else {
            const product = await Product.findByIdAndUpdate(
                productId,
                {
                    $push: { rating: { star: star, comment: comment, postedBy: _id } },
                },
                { new: true },
            );
        }

        const getAllRatings = await Product.findById(productId);
        let totalRating = getAllRatings.rating.length;
        let ratingSum = getAllRatings.rating.reduce((acc, item) => {
            return acc + item.star;
        }, 0);
        let averageRating = Math.round(ratingSum / totalRating);
        let finalProduct = await Product.findByIdAndUpdate(
            productId,
            {
                totalrating: averageRating,
            },
            { new: true },
        );
        res.json(finalProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// uplaod image
const uploadImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const uploader = (path) => uploadImg(path, 'images');
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        const product = await Product.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => {
                    return file;
                }),
            },
            { new: true },
        );
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createProduct,
    getaProducts,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
    uploadImage,
};
