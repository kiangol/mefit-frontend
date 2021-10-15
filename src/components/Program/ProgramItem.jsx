import React from 'react';
import styles from './Program.module.css';


const ProgramItem = ({program, workoutsList}) => {

    const programClicked = event => {
        let exercisesElement = event.currentTarget.children[0].children[1];
        if (exercisesElement.style.display == "none") {
            exercisesElement.style.display = "block";
        } else {
            exercisesElement.style.display = "none";
        }
    };

    return (
        <li className={styles.programCard} onClick={programClicked} value={program.id}>
            <div className={styles.programCard__body}>
                <div className={styles.programCard__grid}>
                    <h1>{program.name}</h1>
                    <p className={styles.programCard__gridElement}><b>Category:</b> {program.category}</p>
                </div>
                <div className={styles.programCard__workouts}>
                    <h3>Workouts:</h3>
                    <ul>
                        {program.workouts.map((workoutId) => (
                            <li className={styles.programCard__workout}>
                                <p><b>Name:</b> {workoutsList[workoutId-1].name}</p>
                                <p><b>Type:</b> {workoutsList[workoutId-1].type}</p>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </li>
    )
};

export default ProgramItem;