import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";

const StatusForOneGoal = ({goal}) => {

    const [completedWorkouts, setCompletedWorkouts] = useState([]);
    const [pendingWorkouts, setPendingWorkouts] = useState([]);
    const [allWorkouts, setAllWorkouts] = useState();


    useEffect(() => {
        const calculateStatus = () => {
            let completedCounter = 0;
            let pendingCounter = 0;
            let completedWorkoutsList = [];
            let pendingWorkoutsList = [];
            let allWorkoutsList = [];

            for (let i = 0; i < goal.workouts.length; i++) {
                console.log("HEI" + JSON.stringify(goal.workouts[i]))
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
            console.log("Complete workouts" + JSON.stringify(completedWorkoutsList))
        };

        calculateStatus();
    }, [])

    return (
        <>
            <h1>WorkoutsForOneGoal - goal id : {goal.id}, ending on {goal.endDate}</h1>
            <h2>Completed workouts: {completedWorkouts.length}</h2>
            <h2>Pending workouts: {pendingWorkouts.length}</h2>
            {goal &&
           goal.workouts.map((goal) => (
                <h1>{goal.name}</h1>
            ))}
        </>
    )
}

export default withKeycloak(StatusForOneGoal);