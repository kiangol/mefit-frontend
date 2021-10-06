import {
    ACTION_REGISTER_ATTEMPTING,
    ACTION_REGISTER_SUCCESS,
    ACTION_REGISTER_ERROR,
} from '../actions/registerActions';

const initialState = {
    registerAttempting: false,
    registerError: ''
}

// Helt lik loginReducer.
export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_REGISTER_ATTEMPTING:
            return {
                ...state,
                registerAttempting: true,
                registerError: '',
            }
        case ACTION_REGISTER_SUCCESS:
            return {
                ...initialState
            }
        case ACTION_REGISTER_ERROR:
            return {
                ...state,
                registerAttempting: false,
                registerError: action.payload
            }
        default:
            return state
    }
}