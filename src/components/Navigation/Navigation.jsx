import React from 'react';
import styles from './Navigation.module.css';
import {NavLink} from 'react-router-dom';
import KeycloakService from "../../services/KeycloakService";

const Navigation = () => {

    const loggedIn = KeycloakService.isLoggedIn()


    return (
        <>
            <nav className={styles.navParent}>
                {!loggedIn &&
                <>
                    <NavLink exact to={"/"} activeClassName={"active"} className={styles.navItem}>
                        Login
                    </NavLink>
                    <NavLink exact to={"/register"} activeClassName={"active"} className={styles.navItem}>
                        Register
                    </NavLink>
                </>
                }

                {loggedIn && // PAGES YOU HAVE TO BE LOGGED IN TO SEE:
                <>
                    <NavLink exact to={"/dashboard"} activeClassName={"active"} className={styles.navItem}>
                        Dashboard
                    </NavLink>
                    <NavLink exact to={"/Programs"} activeClassName={"active"} className={styles.navItem}>
                        Programs
                    </NavLink>
                    <NavLink exact to={"/Workouts"} activeClassName={"active"} className={styles.navItem}>
                        Workouts
                    </NavLink>
                    <NavLink exact to={"/exercises"} activeClassName={"active"} className={styles.navItem}>
                        Exercises
                    </NavLink>
                    <NavLink exact to={"/goals"} activeClassName={"active"} className={styles.navItem}>
                        Goals
                    </NavLink>
                    <NavLink exact to={"/contributor"} activeClassName={"active"} className={styles.navItem}>
                        Contributor
                    </NavLink>
                </>
                }
            </nav>
        </>
    );
};

export default Navigation;