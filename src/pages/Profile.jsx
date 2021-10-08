import React from 'react';
import withKeycloak from "../hoc/withKeycloak";

const Profile = () => {

    return (
        <h1>Profile</h1>
    )
}

export default withKeycloak(Profile);