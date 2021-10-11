import React from 'react';
import styles from './ExerciseItem.module.css';


const ExerciseItem = ({exercise, itemClick}) => {

    return (
        <li className={styles.exerciseCard} onClick={() => itemClick(exercise)} value={exercise.id}>
            <div className={styles.exerciseCard__body}>
                <h1>{exercise.name}</h1>
                <div className={styles.exerciseCard__grid}>
                    <img className={styles.exerciseCard__image} src={exercise.image} alt={exercise.name}/>
                    <p><b>Target Muscle Group:</b> {exercise.targetMuscleGroup}</p></div>
            </div>
        </li>
    )
};

export default ExerciseItem;