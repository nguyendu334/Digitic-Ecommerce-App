import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from './../../utils/axiosConfig';

const register = async (user) => {
    const response = await axios.post(`${base_url}/user/register`, user);
    if (response.data) {
        if (response.data) {
            localStorage.setItem('customer', JSON.stringify(response.data));
        }
        return response.data;
    }
};

const login = async (user) => {
    const response = await axios.post(`${base_url}/user/login`, user);
    if (response.data) {
        return response.data;
    }
};

const getUserWishlist = async () => {
    const response = await axios.get(`${base_url}/user/wishlist`, config);
    if (response.data) {
        return response.data;
    }
};

const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}/user/cart`, cartData, config);
    if (response.data) {
        return response.data;
    }
};

const getCart = async () => {
    const response = await axios.get(`${base_url}/user/cart`, config);
    if (response.data) {
        return response.data;
    }
};

export const authService = {
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
};
