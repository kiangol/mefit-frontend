import http from './http';

const API_URL = '/program';

export const list = async () => {
    try {
        return await http.get(`${API_URL}/`);
    } catch (error) {
        return error;
    }
}

export const createProgram = async program => {
    try {
        return await http.post(`${API_URL}/`, program)
    } catch (error) {
        return error;
    }
}

export default {
    list,
    createProgram
};