import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {markGoalCompleted} from "../../api/GoalAPI";
import styles from "../Goal/StatusForOneGoal.module.css"

const StatusForOneGoal = ({goal}) => {

    const [workouts, setWorkouts] = useState({
        pending: [],
        completed: []
    })
    const [allWorkouts] = useState([...goal.workouts]);

    const date = new Date(goal.endDate).getDate() + "/" + (new Date(goal.endDate).getMonth() + 1) + "/" + new Date(goal.endDate).getFullYear()

    useEffect(() => {
        const calculateStatus = () => {
            const [completed, pending] = sortWorkouts(goal.workouts)
            setWorkouts({completed, pending})
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
        const [completed, pending] = sortWorkouts([...localWorkouts.pending, ...localWorkouts.completed])
        setWorkouts({completed, pending})
        await markGoalCompleted(goal.id, workoutToCompleted)
        window.location.reload("false");
    }


    return (
        <>
            <section className={styles.Status}>
                <h1 className={styles.Title}>Status for Goal</h1>
                <section className={styles.StatusTitleText}>
                    <h5>Goal end date: {date}</h5>
                    <h5>{workouts.completed.length} / {allWorkouts.length} workouts completed</h5>
                </section>
                <section className={styles.PendingCompletedArea}>
                    <div className={styles.List}>
                        <h4>Pending workouts: </h4>
                        {workouts.pending.map((workout) => (
                                <div className={styles.PendingListItem}>
                                    <h5 key={workout.workout.id}>{workout.workout.name}</h5>
                                    <button className={styles.CompleteButton}
                                            onClick={() => handleCompletedWorkoutClick(workout)}>Complete Workout
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                    <div className={styles.List}>
                        <h4>Completed workouts: </h4>
                        {workouts.completed.map((workout) => (
                                <>
                                    <h5 key={workout.workout.id}><span className="material-icons">check</span>{workout.workout.name}</h5>
                                </>
                            )
                        )}
                    </div>
                </section>
            </section>
        </>
    )
}

export default withKeycloak(StatusForOneGoal);