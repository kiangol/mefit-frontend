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
        return await http.patch(`${API_URL_PROFILE}/${profile}/`, {
            goal: goal,
        })
    } catch (error) {
        return error;
    }
}

export const createGoal = async (goal) => {
    try {
        return await http.post(`${API_URL}/`, goal)
    } catch (error) {
        return error
    }
}

export const updateWorkoutInGoal = async (goalId, workouts) => {
    try {
        return await http.patch(`${API_URL}/${goalId}`, {
            workouts: workouts
        })
    } catch (error) {
        return error
    }
}
//api/goal/{goalid}/complete/{workoutid}
export const markGoalCompleted = async (goalId, workoutId) => {
    try {
        return await http.patch(`${API_URL}/${goalId}/complete/${workoutId}`, {
            complete: true
        })
    } catch (error) {
        return error
    }
}


export default {
    list,
    listOne,
    updateGoal,
    createGoal,
    updateWorkoutInGoal,
    markGoalCompleted
};