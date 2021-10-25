import React from 'react';
import styles from './Navigation.module.css';
import {NavLink, useHistory} from 'react-router-dom';
import KeycloakService from "../../services/KeycloakService";
import logo from '../../images/mefit_notext.svg'

const Navigation = () => {
    const history = useHistory();
    const loggedIn = KeycloakService.isLoggedIn()
    const contributor = KeycloakService.hasRole(["contributor"])

    const onLogoClick = () => {
        history.push("/")
    }

    return (
        <>
            <nav className={styles.navParent}>
                <img className={styles.navIcon} src={logo} alt="mefit logo" onClick={onLogoClick}/>
                {!loggedIn &&
                <>
                    <div onClick={() => {KeycloakService.doLogin()}} className={styles.navItem}>
                        <NavLink exact to={"/"} activeClassName={"active"} className={styles.navItem}>
                            Login
                        </NavLink>
                    </div>
                    {/*<NavLink exact to={"/register"} activeClassName={"active"} className={styles.navItem}>*/}
                    {/*    Register*/}
                    {/*</NavLink>*/}
                </>
                }

                {loggedIn && // PAGES YOU HAVE TO BE LOGGED IN TO SEE:
                <>
                    <NavLink exact to={"/dashboard"} activeClassName={styles.active} className={styles.navItem}>
                        Dashboard
                    </NavLink>
                    <NavLink exact to={"/programs"} activeClassName={styles.active} className={styles.navItem}>
                        Programs
                    </NavLink>
                    <NavLink exact to={"/workouts"} activeClassName={styles.active} className={styles.navItem}>
                        Workouts
                    </NavLink>
                    <NavLink exact to={"/exercises"} activeClassName={styles.active} className={styles.navItem}>
                        Exercises
                    </NavLink>
                    <NavLink exact to={"/goals"} activeClassName={styles.active} className={styles.navItem}>
                        Goals
                    </NavLink>
                    {contributor &&
                    <NavLink exact to={"/contributor"} activeClassName={styles.active} className={styles.navItem}>
                        Contributor
                    </NavLink>
                    }
                </>
                }
            </nav>
        </>
    );
};

export default Navigation;