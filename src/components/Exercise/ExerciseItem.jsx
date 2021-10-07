import React from 'react';

const ExerciseItem = ({ list }) => (
    <ul>
        {list.map((exercise) => (
            <li key={exercise.id}>
                <p><b>ID:</b> {exercise.id}</p>
                <p><b>Name:</b> {exercise.name}</p>
                <p><b>Description:</b> {exercise.description}</p>
                <p><b>Target Muscle Group:</b> {exercise.targetMuscleGroup}</p>
                <p><b>Image Link:</b> {exercise.image}</p>
                <p><b>Video Link:</b> {exercise.vidLink}</p>
            </li>
        ))}
    </ul>
)

export default ExerciseItem;