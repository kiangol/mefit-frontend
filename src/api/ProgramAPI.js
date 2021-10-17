import http from './http';

const API_URL = '/program';

export const list = async () => {
    try {
        return await http.get(`${API_URL}/`);
    } catch (error) {
        return error;
    }
}

export default {
    list
};