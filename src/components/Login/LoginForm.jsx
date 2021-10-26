import React, {useState} from "react"
import {loginAttemptAction} from "../../store/actions/loginActions";
import {useDispatch} from "react-redux";
import {registerAttemptAction} from "../../store/actions/registerActions";
import KeycloakService from "../../services/KeycloakService";
import logo from "../../images/mefit_with_text.svg";
import styles from "./Login.module.css"

const LoginForm = ({onRegisterNewUserClick}) => {

    const dispatch = useDispatch();
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

    const onFormSubmit = event => {
        event.preventDefault()
        //dispatch(loginAttemptAction(credentials))
        KeycloakService.doLogin()
    }

    return (
        <>
            <div align="center">
            <img className={styles.logoWithText} src={logo} alt="mefit" style={{width: "34rem", marginRight: "10rem"}}/>
            </div>
            <div className={"login-root"}>

            <form className={"mt-3"} onSubmit={onFormSubmit} >
                <p>Welcome to MeFit, the place to get fit!</p>
                <h1>Get started on MeFit</h1>

                {/*<div className="mb-3">*/}
                {/*    <label htmlFor="username" className={"form-label"}>Username</label>*/}
                {/*    <input id={"username"}*/}
                {/*           type={"text"}*/}
                {/*           placeholder={"Enter your username"}*/}
                {/*           className={"form-control"}*/}
                {/*           onChange={onInputChange}*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className="mb-3">*/}
                {/*    <label htmlFor="password" className={"form-label"}>Password</label>*/}
                {/*    <input id={"password"}*/}
                {/*           type={"password"}*/}
                {/*           placeholder={"Enter your password"}*/}
                {/*           className={"form-control"}*/}
                {/*           onChange={onInputChange}*/}
                {/*    />*/}
                {/*</div>*/}

                <button type={"submit"} className={"btn btn-warning btn-lg"} style={{verticalAlign: "middle"}}>
                    Login
                    <span className="material-icons">
                                login
                            </span>
                </button>
                {/*<button type={"button"} className={"btn btn-primary btn-lg"} onClick={onRegisterNewUserClick}>Sign up*/}
                {/*</button>*/}
            </form>
            </div>
        </>
    );
};

export default LoginForm;
