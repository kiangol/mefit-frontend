import {
    ACTION_LOGIN_ATTEMPTING,
    ACTION_LOGIN_SUCCESS, loginErrorAction,
    loginSuccessAction
} from "../actions/loginActions";
import {login} from "../../api/LoginAPI";

export const loginMiddleware = ({dispatch}) => next => action => {
    next(action)

    if (action.type === ACTION_LOGIN_ATTEMPTING) {
        login(action.payload)
            .then(profile => {
                dispatch(loginSuccessAction(profile))
            })
            .catch(error => {
                dispatch(loginErrorAction(error.message))
            })
    }
}