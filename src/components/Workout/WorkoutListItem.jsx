import React from 'react';

import {listOne} from "../../api/ExerciseAPI";

const WorkoutListItem = ({workout, itemClick}) => {


    return (

        <li onClick={itemClick} value={workout.id}>
            <p><b>Name:</b> {workout.name}</p>
            <p><b>Type of workout:</b> {workout.type}</p>
        </li>

    )
}

export default WorkoutListItem;