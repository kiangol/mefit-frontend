import React from 'react';

import styles from './Header.module.css';

import Navigation from "../Navigation/Navigation";
import {useHistory} from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";

const Header = () => {

    const loggedIn = KeycloakService.isLoggedIn();
    const name = KeycloakService.getUsername();

    const handleLogoutClick = () => {
		if (window.confirm('Are you sure?')) {
			KeycloakService.doLogout()
		}
	};



     const history = useHistory();

     const goToProfile = () => {
        history.push("/profile") // history.push("/profiles" + id)
    }

    return (
        <>
            <header className={styles.Header}>
                <Navigation/>

                {loggedIn &&
                <div className={styles.userAndLogoutDiv}>
                    <div className={styles.userAndLogoutDiv_User}>
                        <span onClick={goToProfile}>{name}</span>
                    </div>
                    <div>
                        <button type={"button"} onClick={handleLogoutClick}>Logout</button>
                    </div>
                </div>
                }
            </header>

        </>
    )
};

export default Header;