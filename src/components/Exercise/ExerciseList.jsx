import React from 'react';
import styles from './ExerciseItem.module.css';
import ExerciseItem from "./ExerciseItem";


const ExerciseList = ({list, clicker}) => {

    return (
        <ul className={styles.exerciseList}>
            {list.map((exercise) => (
                <ExerciseItem key={exercise.id} exercise={exercise} itemClick={clicker}/>
            ))}
        </ul>
    );
};

export default ExerciseList;