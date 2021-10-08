import React from 'react';
import withKeycloak from "../hoc/withKeycloak";

const Dashboard = () => {

    return (
        <h1>Dashboard</h1>
    )
}

export default withKeycloak(Dashboard);