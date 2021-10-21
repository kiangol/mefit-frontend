import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {markGoalCompleted} from "../../api/GoalAPI";

const StatusForOneGoal = ({goal}) => {

    const [ workouts, setWorkouts ] = useState({
        pending: [],
        complete: []
    })
    const [allWorkouts, setAllWorkouts] = useState([...goal.workouts]);

    const date = new Date(goal.endDate).getDate() + "/" + (new Date(goal.endDate).getMonth()+1) + "/" + new Date(goal.endDate).getFullYear()


    useEffect(() => {
        const calculateStatus = () => {
            const [ complete, pending ] = sortWorkouts(goal.workouts)

            setWorkouts({ complete, pending })
        };
        calculateStatus();
    }, [])

    const sortWorkouts = (workouts) => {
        const complete = workouts.filter(workout => workout.complete)
        const pending = workouts.filter(workout => !workout.complete)
        return [
            complete,
            pending
        ]
    }

    const handleCompletedWorkoutClick = async workout => {
        const localWorkouts = {...workouts}
        let workoutToComplete;
        for (let i = 0; i < localWorkouts.pending.length; i++) {
            if (localWorkouts.pending[i].id === workout.id) {
                localWorkouts.pending[i].complete = true;
                workoutToComplete = localWorkouts.pending[i].id;
                break;
            }
        }
        const [ complete, pending ] = sortWorkouts([...localWorkouts.pending, ...localWorkouts.complete])
        setWorkouts({ complete, pending })

        await markGoalCompleted(goal.id, workoutToComplete)
    }


    return (
        <>
            <h2>Current goal end date: {date}</h2>
            <h2>{workouts.complete.length} out of {allWorkouts.length} workouts done for this goal.</h2>
            <h2>Pending workouts: </h2>
            {workouts.pending.map((workout) => (
                    <>
                        <h4 key={workout.id}>{workout.name}</h4>
                        <button onClick={() => handleCompletedWorkoutClick(workout)}>Completed</button>
                    </>
                )
            )}

            <h2>Completed workouts: </h2>
            {workouts.complete.map((workout) => (
                    <>
                        <h4 key={workout.id}>{workout.name}</h4>
                    </>
                )
            )}
        </>
    )
}

export default withKeycloak(StatusForOneGoal);