import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {markGoalCompleted} from "../../api/GoalAPI";

const StatusForOneGoal = ({goal}) => {

    const [ workouts, setWorkouts ] = useState({
        pending: [],
        completed: []
    })
    const [allWorkouts] = useState([...goal.workouts]);

    const date = new Date(goal.endDate).getDate() + "/" + (new Date(goal.endDate).getMonth()+1) + "/" + new Date(goal.endDate).getFullYear()
    
    useEffect(() => {
        const calculateStatus = () => {
            const [ completed, pending ] = sortWorkouts(goal.workouts)
            setWorkouts({ completed, pending })
        };
        calculateStatus();
    }, [])

    const sortWorkouts = (workouts) => {
        const completed = workouts.filter(workout => workout.completed)
        const pending = workouts.filter(workout => !workout.completed)
        return [
            completed,
            pending
        ]
    }

    const handleCompletedWorkoutClick = async workout => {
        const localWorkouts = {...workouts}
        let workoutToCompleted;
        for (let i = 0; i < localWorkouts.pending.length; i++) {
            if (localWorkouts.pending[i].workout.id === workout.workout.id) {
                localWorkouts.pending[i].workout.completed = true;
                workoutToCompleted = localWorkouts.pending[i].workout.id;
                break;
            }
        }
        const [ completed, pending ] = sortWorkouts([...localWorkouts.pending, ...localWorkouts.completed])
        setWorkouts({ completed, pending })
        await markGoalCompleted(goal.id, workoutToCompleted)
        window.location.reload("false");
    }


    return (
        <>
            <h2>Current goal end date: {date}</h2>
            <h2>{workouts.completed.length} out of {allWorkouts.length} workouts done for this goal.</h2>
            <h2>Pending workouts: </h2>
            {workouts.pending.map((workout) => (
                    <>
                        <h4 key={workout.workout.id}>{workout.workout.name}</h4>
                        <button onClick={() => handleCompletedWorkoutClick(workout)}>Completed</button>
                    </>
                )
            )}

            <h2>Completed workouts: </h2>
            {workouts.completed.map((workout) => (
                    <>
                        <h4 key={workout.workout.id}>{workout.workout.name}</h4>
                    </>
                )
            )}
        </>
    )
}

export default withKeycloak(StatusForOneGoal);