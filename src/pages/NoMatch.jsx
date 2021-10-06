import React from 'react';
import {Link} from 'react-router-dom';

{
    /* If you try to enter an invalid URL, this page will be shown. */
}

const NotFound = () => {
    return (
        <>
            <h1>Error</h1>
            <h2>Page not found</h2>
            <Link to={"/"}>Take me home</Link>
        </>
    )
}

export default NotFound;