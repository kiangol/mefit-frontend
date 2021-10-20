import http from './http';

const API_URL = '/profile';

export const list = async () => {
    try {
        return await http.get(`${API_URL}/`);
    } catch (error) {
        return error;
    }
}

export const create = async (data) => {
    try {
        return await http.post(`${API_URL}/add/`, data);
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const remove = async (id) => {
    try {
        return await http.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const listOne = async (id) => {
    try {
        return await http.post(`${API_URL}`, {
            'username': id
        })
    } catch (error) {
        return error;
    }
}

export default {
    list,
    create,
    listOne
};