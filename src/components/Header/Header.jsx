import React from 'react';

import styles from './Header.module.css';

import Navigation from "../Navigation/Navigation";

const Header = () => (
    <>
        <header className={styles.Header}>
            <Navigation/>
        </header>

    </>
)

export default Header;