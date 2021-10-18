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

export const updateGoal = async (profile, goal) => {
    try {

        return await http.patch(`${API_URL_PROFILE}/`, {
            data: JSON.stringify( {
                "username": profile,
                "goal": goal,
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
    listOne,
    updateGoal,
};