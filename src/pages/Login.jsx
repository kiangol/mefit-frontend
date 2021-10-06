import React from "react"
import {useHistory} from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {

    let history = useHistory();

    const onRegisterNewUserClick = () => {
        history.push("/register")
    }

    return (
        <>
            <LoginForm onRegisterNewUserClick={onRegisterNewUserClick}/>
        </>
    )
};

export default Login;