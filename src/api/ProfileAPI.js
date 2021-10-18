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
        return error;
    }
}

export const listOne = async (id) => {
    try {
        console.log("GET profile: " + id);
        return await http.post(`${API_URL}/`, {
            data: JSON.stringify( {
                "username": id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        return error;
    }
}

export default {
    list,
    create,
    listOne
};