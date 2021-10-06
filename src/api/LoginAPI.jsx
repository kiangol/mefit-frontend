import http from './http';

const API_URL = '/login';

export const login = async (data) => {
    try {
        return await http.post('/', data)
    } catch (error) {
        return error.response.data;
    }
};

export default {
    login,
};