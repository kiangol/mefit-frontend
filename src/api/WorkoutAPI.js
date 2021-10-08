import http from './http';

const API_URL = '/workouts';

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