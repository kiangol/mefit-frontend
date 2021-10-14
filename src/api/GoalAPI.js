import http from './http';

const API_URL = '/goal';

export const create = async (date) => {
    try {
        return await http.post(`${API_URL}/`, date);
    } catch (error) {
        return error;
    }
}

export default {
    create,
};