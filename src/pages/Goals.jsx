import React from 'react';
import withKeycloak from "../hoc/withKeycloak";

const Goals = () => {

    return (
        <h1>Goals</h1>
    )
}

export default withKeycloak(Goals);