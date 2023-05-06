import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBrands = async () => {
    const response = await axios.get(`${base_url}/brand/`);
    return response.data;
};

const createBrands = async (brand) => {
    const response = await axios.post(`${base_url}/brand/create-brand`, brand, config);
    return response.data;
};

const brandService = {
    getBrands,
    createBrands,
};

export default brandService;
