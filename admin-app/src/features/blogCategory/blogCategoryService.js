import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBlogCategory = async () => {
    const response = await axios.get(`${base_url}/blog-category/`);
    return response.data;
};

const createBlogCategory = async (category) => {
    const response = await axios.post(
        `${base_url}/blog-category/create-category`,
        category,
        config,
    );
    return response.data;
};

const blogCategoryService = {
    getBlogCategory,
    createBlogCategory,
};

export default blogCategoryService;
