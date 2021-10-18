import http from './http';

const API_URL = '/goal';
const API_URL_PROFILE = '/profile'

export const list = async () => {
    try {
        return await http.get(`${API_URL}/`);
    } catch (error) {
        return error;
    }
}

export const listOne = async (id) => {
    try {
        return await http.get(`${API_URL}/${id}`);
    } catch (error) {
        return error;
    }
}

export const create = async (goal) => {
    try {
        return await http.post(`${API_URL_PROFILE}/`, goal)
    } catch (error) {
        return error
    }
}

export default {
    list,
    listOne,
    create,
};