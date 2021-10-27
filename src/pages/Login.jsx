import React from "react";
import {useHistory} from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import KeycloakService from "../services/KeycloakService";

const Login = () => {

    let history = useHistory();

    const isLoggedIn = KeycloakService.isLoggedIn();

    const onRegisterNewUserClick = () => {
        history.push("/register");
    };

    return (
        <>
            {!isLoggedIn &&
            <LoginForm />
            }
            {isLoggedIn &&
            history.push("/dashboard")}

        </>
    );
};

export default Login;