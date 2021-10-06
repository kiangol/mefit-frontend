import React from 'react';

const ExerciseItem = ({ list }) => (
    <ul>
        {list.map((exercise) => (
            <li>
                <p>{exercise.exerciseId}</p>
                <p>{exercise.name}</p>
                <p>{exercise.description}</p>
                <p>{exercise.targetMuscleGroup}</p>
                <p>{exercise.image}</p>
                <p>{exercise.vidLink}</p>
            </li>
        ))}
    </ul>
)

export default ExerciseItem;