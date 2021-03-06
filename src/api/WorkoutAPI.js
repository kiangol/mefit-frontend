import http from './http';

const API_URL = '/workout';

export const list = async () => {
    try {
        return await http.get(`${API_URL}/`);
    } catch (error) {
        return error;
    }
}

export const create = async (data) => {
    try {
        return await http.post(`${API_URL}/`, data);
    } catch (error) {
        return error;
    }
}

export const updateWorkout = async (data) => {
    try {
        return await http.patch(`${API_URL}/`, data);
    } catch (error) {
        return error;
    }
}

export default {
    list,
    create,
    updateWorkout
};