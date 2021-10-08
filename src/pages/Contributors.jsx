import React from 'react';
import withKeycloak from "../hoc/withKeycloak";

const Contributors = () => {

    return (
        <h1>Contributors</h1>
    )
}

export default withKeycloak(Contributors);