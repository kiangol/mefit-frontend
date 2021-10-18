import http from './http';

const API_URL = '/goal';

export const goal = async (data) => {
    try {
        return await http.get(`${API_URL}/`, data);
    } catch (error) {
        return error;
    }
}

export default {
    goal,
};