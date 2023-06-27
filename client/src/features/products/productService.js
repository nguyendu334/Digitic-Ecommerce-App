import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getAllProducts = async () => {
    const response = await axios.get(`${base_url}/product`);
    if (response.data) {
        return response.data;
    }
};

// const addToWishlist = async () => {
//     const response = await axios.get(`${base_url}/product/wishlist`);
//     if (response.data) {
//         return response.data;
//     }
// };

export const productService = {
    getAllProducts,
    // addToWishlist,
};
