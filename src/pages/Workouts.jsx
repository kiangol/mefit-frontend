import React from 'react';
import withKeycloak from "../hoc/withKeycloak";

const Workouts = () => {

    return (
        <h1>Workouts</h1>
    )
}

export default withKeycloak(Workouts);