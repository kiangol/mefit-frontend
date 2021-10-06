import {loginReducer} from './loginReducer'
import {combineReducers} from "redux";
import {registerReducer} from "./registerReducer";


const appReducer = combineReducers({
    loginReducer,
    registerReducer
})

export default appReducer