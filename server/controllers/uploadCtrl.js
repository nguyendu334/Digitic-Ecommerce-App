
const asyncHandler = require('express-async-handler');
const { uploadImg, deleteImg } = require('../utils/cloudinary');
const fs = require('fs');

// uplaod image
const uploadImage = asyncHandler(async (req, res) => {
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
        const images = urls.map((file) => {
            return file;
        });
        res.json(images);
    } catch (error) {
        throw new Error(error);
    }
});

// delete image
const deleteImage = asyncHandler(async (req, res) => {
    try {
        const deleted = deleteImg(req.params.id, 'images');
        res.json({
            message: 'Image deleted successfully',
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    uploadImage,
    deleteImage,
};
