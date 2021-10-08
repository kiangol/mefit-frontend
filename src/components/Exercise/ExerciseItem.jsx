import React from 'react';

const ExerciseItem = ({ list }) => (
    <ul>
        {list.map((exercise) => (
            <li key={exercise.id}>
                <p><b>Name:</b> {exercise.name}</p>
                <p><b>Target Muscle Group:</b> {exercise.targetMuscleGroup}</p>
                <p><b>Image Link:</b> {exercise.image}</p>
            </li>
        ))}
    </ul>
)

export default ExerciseItem;