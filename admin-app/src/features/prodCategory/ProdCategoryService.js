import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getProductCategories = async () => {
    const response = await axios.get(`${base_url}/category/`);
    return response.data;
};

const createProdCategory = async (category) => {
    const response = await axios.post(`${base_url}/category/create-category`, category, config);
    return response.data;
};

const productCategoryService = {
    getProductCategories,
    createProdCategory,
};

export default productCategoryService;
