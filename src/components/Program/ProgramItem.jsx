import React from 'react';
import styles from './Program.module.css';


const ProgramItem = ({program, workoutsList}) => {

    const programClicked = event => {
        let workoutsElement = event.currentTarget.children[0].children[1];
        if (workoutsElement.style.display == "block") {
            workoutsElement.style.display = "none";
        } else {
            workoutsElement.style.display = "block";
        }
    };

    return (
        <li className={styles.programCard} onClick={programClicked} value={program.id}>
            <div className={styles.programCard__body}>
                <div className={styles.programCard__grid}>
                    <h2>{program.name}</h2>
                    <p className={styles.programCard__gridElement}><b>Category:</b> {program.category}</p>
                </div>
                <div className={styles.programCard__workouts}>
                    <h4>Workouts:</h4>
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