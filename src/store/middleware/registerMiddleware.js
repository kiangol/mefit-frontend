import {
    ACTION_REGISTER_ATTEMPTING,
    ACTION_REGISTER_SUCCESS,
    ACTION_REGISTER_ERROR,
    registerAttemptAction,
    registerSuccessAction,
    registerErrorAction
} from "../actions/registerActions";

export const registerMiddleware = ({dispatch}) => next => action => {
    // code
}