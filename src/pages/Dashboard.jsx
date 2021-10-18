import React from 'react';
import withKeycloak from "../hoc/withKeycloak";
import GoalsDashBoard from "./GoalsDashBoard";

const Dashboard = () => {

    return (
        <>
        <h1>Dashboard</h1>
        <GoalsDashBoard/>
        </>
    )
}

export default withKeycloak(Dashboard);