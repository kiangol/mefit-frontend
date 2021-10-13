import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";

const StatusForOneGoal = ({goal}) => {

    const [completedWorkouts, setCompletedWorkouts] = useState([]);
    const [pendingWorkouts, setPendingWorkouts] = useState([]);
    const [allWorkouts, setAllWorkouts] = useState([]);

    const date = new Date(goal.endDate).getDate() + "/" + new Date(goal.endDate).getMonth() + "/" + new Date(goal.endDate).getFullYear()


    useEffect(() => {
        const calculateStatus = () => {
            let completedCounter = 0;
            let pendingCounter = 0;
            let completedWorkoutsList = [];
            let pendingWorkoutsList = [];
            let allWorkoutsList = [];

            for (let i = 0; i < goal.workouts.length; i++) {
                if (goal.workouts[i].complete) {
                    completedCounter++;
                    completedWorkoutsList.push([
                        ...completedWorkouts,
                        goal.workouts[i]
                    ])

                } else {
                    pendingCounter++;
                    pendingWorkoutsList.push([
                        ...pendingWorkouts,
                        goal.workouts[i]
                    ])
                }
            }
            setCompletedWorkouts(completedWorkoutsList)
            setPendingWorkouts(pendingWorkoutsList)
            setAllWorkouts(goal.workouts)
        };

        calculateStatus();
    }, [])

    return (
        <>
            <h2>Current goal end date: {date}</h2>
            <h2>{completedWorkouts.length} out of {allWorkouts.length} workouts done for this goal.</h2>
            <h2>Completed workouts: {completedWorkouts.length}</h2>
            {completedWorkouts &&
            [...completedWorkouts].map((workout) => (
                    <>
                        <h4>{workout[0].name}</h4>
                    </>
                )
            )}
            <h2>Pending workouts: {pendingWorkouts.length}</h2>
            {pendingWorkouts &&
            [...pendingWorkouts].map((workout) => (
                    <>
                        <h4>{workout[0].name}</h4>
                    </>
                )
            )}

            <h2>All workouts</h2>
            {allWorkouts &&
            [...allWorkouts].map((workout) => (
                    <>
                        <h2>{workout.name}</h2>
                    </>
                )
            )}

        </>
    )
}

export default withKeycloak(StatusForOneGoal);