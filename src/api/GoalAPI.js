import http from './http';

const API_URL = '/goal';

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
export default {
    list,
    listOne
};