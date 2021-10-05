import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () => {


    return (
        <>
            <NavLink exact to={"/"} activeClassName={"active"}>
                Login
            </NavLink>
            <NavLink exact to={"/hehehe"} activeClassName={"active"}>
                Error
            </NavLink>
        </>
    );
};

export default Navigation;