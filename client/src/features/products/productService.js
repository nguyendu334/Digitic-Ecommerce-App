import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from './../../utils/axiosConfig';

const getAllProducts = async () => {
    const response = await axios.get(`${base_url}/product`);
    if (response.data) {
        return response.data;
    }
};

const getProduct = async (id) => {
    const response = await axios.get(`${base_url}/product/${id}`);
    if (response.data) {
        return response.data;
    }
};

const addToWishlist = async (productId) => {
    const response = await axios.put(`${base_url}/product/wishlist`, { productId }, config);
    if (response.data) {
        return response.data;
    }
};

export const productService = {
    getAllProducts,
    getProduct,
    addToWishlist,
};
