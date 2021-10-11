import React from 'react';
import styles from './ExerciseItem.module.css'

const ExerciseItem = ({ list }) => (
    <ul>
        {list.map((exercise) => (
            <li key={exercise.id} className={styles.workoutCard}>
                <div className={styles.workoutCard__body}>
                    <h1>{exercise.name}</h1>
                    <p><b>Target Muscle Group:</b> {exercise.targetMuscleGroup}</p>
                    <img className={styles.workoutCard__image} src={exercise.image} alt={exercise.name}/>
                </div>
            </li>
        ))}
    </ul>
)

export default ExerciseItem;