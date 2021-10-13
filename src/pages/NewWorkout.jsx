import React from 'react';
import WorkoutForm from "../components/Workout/WorkoutForm";
import withKeycloak from "../hoc/withKeycloak";

const NewWorkout = () => {



    return (
        <>
            <WorkoutForm />
        </>
    )
}

export default withKeycloak(NewWorkout)