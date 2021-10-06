import http from './http';

const API_URL = '/exercises';

export const list = async () => {
    try {
        return await http.get(`${API_URL}/exercise`);
    } catch (error) {
        return error;
    }
}

export default {
    list
};