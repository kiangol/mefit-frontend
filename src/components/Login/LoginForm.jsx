import React, {useState} from "react"
import {loginAttemptAction} from "../../store/actions/loginActions";

const LoginForm = ({onRegisterNewUserClick}) => {


    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const onInputChange = event => {
        setCredentials({
            ...credentials,
            [event.target.id]: event.target.value
        })

        loginAttemptAction(credentials);
    }

    return (
        <>
            <form className={"mt-3"}>
                <h1>Login to MeFit</h1>
                <p>Welcome to MeFit, the place to get fit!</p>

                <div className="mb-3">
                    <label htmlFor="username" className={"form-label"}>Username</label>
                    <input id={"username"}
                           type={"text"}
                           placeholder={"Enter your username"}
                           className={"form-control"}
                           onChange={onInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className={"form-label"}>Password</label>
                    <input id={"password"}
                           type={"password"}
                           placeholder={"Enter your password"}
                           className={"form-control"}
                           onChange={onInputChange}
                    />
                </div>

                <button type={"submit"} className={"btn btn-primary btn-lg"}>Login</button>
                <button type={"button"} className={"btn btn-primary btn-lg"} onClick={onRegisterNewUserClick}>Sign up</button>
            </form>
        </>
    );
};

export default LoginForm;