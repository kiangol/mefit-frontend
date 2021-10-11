import React from 'react';
import WorkoutListItem from "./WorkoutListItem";


const WorkoutList = ({list}) => {

    const handleWorkoutListItemClick = event => {
        console.log("JEG ER VALUE" + event.currentTarget.value)
    }

    return (
        <ul>
            {list.map((workout) => (
                <WorkoutListItem key={workout.id} itemClick={handleWorkoutListItemClick} workout={workout}/>
            ))}
        </ul>
    )


}

export default WorkoutList;