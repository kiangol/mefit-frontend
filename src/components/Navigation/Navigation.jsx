import React from 'react';
import styles from './Navigation.module.css';
import {NavLink} from 'react-router-dom';

const Navigation = () => {


    return (
        <>
            <nav className={styles.navParent}>
                <NavLink exact to={"/"} activeClassName={"active"} className={styles.navItem}>
                    Login
                </NavLink>
                <NavLink exact to={"/register"} activeClassName={"active"} className={styles.navItem}>
                    Register
                </NavLink>
                <NavLink exact to={"/exercises"} activeClassName={"active"} className={styles.navItem}>
                    Exercises
                </NavLink>
                <NavLink exact to={"/notfound"} activeClassName={"active"} className={styles.navItem}>
                    Error
                </NavLink>
            </nav>
        </>
    );
};

export default Navigation;