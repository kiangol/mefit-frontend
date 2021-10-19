import React from 'react';
import WorkoutListItem from "./WorkoutListItem";
import styles from './Workout.module.css';


const WorkoutList = ({list, exerciseClicked}) => {

    return (
        <ul>
            {list.map((workout) => (
                <WorkoutListItem key={workout.id} workout={workout} exerciseClicked={exerciseClicked}/>
            ))}
        </ul>
    )


}

export default WorkoutList;