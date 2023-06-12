import axios from 'axios';
import { base_url } from '../../utils/base_url';

const register = async (user) => {
    const response = await axios.post(`${base_url}/user/register`, user);
    if (response.data) {
        return response.data;
    }
};

const login = async (user) => {
    const response = await axios.post(`${base_url}/user/login`, user);
    if (response.data) {
        return response.data;
    }
};

export const authService = {
    register,
    login,
};
