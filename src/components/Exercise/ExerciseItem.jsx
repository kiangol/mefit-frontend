import React from 'react';
import styles from './ExerciseItem.module.css';


const ExerciseItem = ({list}) => (
    <ul className={styles.exerciseList}>
        {list.map((exercise) => (
            <li key={exercise.id} className={styles.exerciseCard}>
                <div className={styles.exerciseCard__body}>
                    <h1>{exercise.name}</h1>
                    <div className={styles.exerciseCard__grid}>
                        <img className={styles.exerciseCard__image} src={exercise.image} alt={exercise.name}/>
                        <p><b>Target Muscle Group:</b> {exercise.targetMuscleGroup}</p></div>
                </div>
            </li>
        ))}
    </ul>
);

export default ExerciseItem;