
import styles from './Workout.module.css';

const WorkoutListItem = ({workout}) => {

    const workoutClicked = event => {
        let exercisesElement = event.currentTarget.children[0].children[2];
        if (exercisesElement.style.display == "block") {
            exercisesElement.style.display = "none";
        } else {
            exercisesElement.style.display = "block";
        }
    };

    const exerciseClicked = event => {
        event.stopPropagation();
        let exercisesElement = event.currentTarget.children[1];
        if (exercisesElement.style.display == "block") {
            exercisesElement.style.display = "none";
        } else {
            exercisesElement.style.display = "block";
        }
    };

    return (

        <li onClick={workoutClicked} value={workout.id} className={styles.workoutCard}>
            <div className={styles.workoutCard__body}>
                <h2>{workout.name}</h2>
                <p><b>Type of workout:</b> {workout.type}</p>
                <div className={styles.workoutCard__exercises}>
                    <h4>Exercises:</h4>
                    <ul>
                        {workout.sets.map((set) => (
                            <li onClick={exerciseClicked} className={styles.workoutCard__exercise}>
                                <div className={styles.workoutCard__exerciseGrid}>
                                    <h5>{set.exercise.name}</h5>
                                    <p><b>Target muscle group:</b> {set.exercise.targetMuscleGroup}</p>
                                    <p><b>Repetitions per set:</b> {set.exerciseRepetitions}</p>
                                </div>
                                <div className={styles.workoutCard__exerciseExtraInfo}>
                                    <p><b>Description:</b> {set.exercise.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </li>
    )
};

export default WorkoutListItem;