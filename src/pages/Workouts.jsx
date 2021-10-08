import React from 'react';
import withKeycloak from "../hoc/withKeycloak";

const Workouts = () => {

    return (
        <h1>Workout</h1>
    )
}

export default withKeycloak(Workouts);