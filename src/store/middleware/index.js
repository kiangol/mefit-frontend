import { loginMiddleware } from './loginMiddleware';
import {applyMiddleware} from "redux";
import {registerMiddleware} from "./registerMiddleware";

export default applyMiddleware(
    loginMiddleware,
    registerMiddleware

)