import React from 'react';
import styles from './ExerciseItem.module.css'

const ExerciseItem = ({ list }) => (
    <ul>
        {list.map((exercise) => (
            <li key={exercise.id} className={styles.workoutCard}>
                <div className={styles.workoutCard__body}>
                    <p><b>Name:</b> {exercise.name}</p>
                    <p><b>Target Muscle Group:</b> {exercise.targetMuscleGroup}</p>
                    <p><b>Image Link:</b> {exercise.image}</p>
                </div>
            </li>
        ))}
    </ul>
)

export default ExerciseItem;