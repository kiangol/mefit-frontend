import React, {useState} from "react"
import {loginAttemptAction} from "../../store/actions/loginActions";
import {useDispatch} from "react-redux";
import {registerAttemptAction} from "../../store/actions/registerActions";
import KeycloakService from "../../services/KeycloakService";
import logo from "../../images/mefit_with_text.svg";
import styles from "./Login.module.css"

const LoginForm = () => {

    return (
        <section className={styles.LandingPage}>

            <div className={styles.TextArea}>

                <p>Welcome to MeFit, the place to get fit!</p>
                <h1>Get started on MeFit</h1>

                <button type={"button"} onClick={() => KeycloakService.doLogin()}>
                    Login

                </button>
            </div>

            <div className={styles.MefitLogo}>
                <img className={styles.logoWithText} src={logo} alt="mefit"
                     style={{width: "34rem", marginRight: "10rem"}}/>
            </div>
        </section>
    );
};

export default LoginForm;
