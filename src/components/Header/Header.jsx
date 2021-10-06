import React from 'react';

import styles from './Header.module.css';

import Navigation from "../Navigation/Navigation";
import {useHistory} from "react-router-dom";

const Header = () => {

    let name = "MeFit User";
    let loggedIn = true;

    /*
        When a reducer for the session is in place, this can be uncommented and
        it'll hopefully work. Remember to remove the two let's above.
     const {loggedIn, name, id} = useSelector(state => state.sessionReducer)
     */
     const history = useHistory();

     const goToProfile = () => {
        history.push("/profiles") // history.push("/profiles" + id)
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
                        <button>Logout</button>
                    </div>
                </div>
                }
            </header>

        </>
    )
};

export default Header;