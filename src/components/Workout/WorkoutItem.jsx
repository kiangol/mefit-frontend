import React from 'react';

const WorkoutItem = ({ list }) => (
    <ul>
        {list.map((workout) => (
            <li key={workout.id}>
                <p><b>Name:</b> {workout.name}</p>
                <p><b>Type of workout:</b> {workout.type}</p>
            </li>
        ))}
    </ul>
)

export default WorkoutItem;