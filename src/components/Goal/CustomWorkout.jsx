import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/ExerciseAPI";
import {updateGoal, updateWorkoutInGoal} from "../../api/GoalAPI";
import KeycloakService from "../../services/KeycloakService";
import {listOne} from "../../api/ProfileAPI";
import {create} from "../../api/WorkoutAPI";

const CustomWorkout = ({preWorkouts}) => {

    const [exercises, setExercises] = useState();
    const [profile, setProfile] = useState();
    const [username] = useState({
        username: KeycloakService.getUsername()
    })
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedExercisesToShow, setSelectedExercisesToShow] = useState([]);
    const [listOfExercises, setListOfExercises] = useState([])
    const [allWorkouts, setAllWorkouts] = useState([...preWorkouts])
    const [customWorkout, setCustomWorkout] = useState({
        name: "",
        type: "",
        sets: [],
    })
    const [customSets, setCustomSets] = useState(
        {
            exerciseRepetitions: 1,
            difficulty: 1,
            exercise: null
        }
    )

    useEffect(() => {
        const fetchExercises = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error);
            } else {
                setExercises(data);
            }
        };
        const fetchProfile = async () => {
            const {data, error} = await listOne(username.username);
            if (error) {
                console.log(error);
            } else {
                setProfile(data);
            }
        };
        fetchExercises();
        fetchProfile();
    }, [])

    const handleSelectingExercises = (exercise) => {
        const localSelectedWorkouts = [...selectedExercises];
        const localSelectedWorkoutsToShow = [...selectedExercisesToShow];
        const listOfExercisesSoFar = [...listOfExercises];
        let notFound = false;
        if (localSelectedWorkouts.length !== 0) {
            for (let i = 0; i < selectedExercises.length; i++) {
                if (localSelectedWorkouts[i] === exercise.id) {
                    localSelectedWorkouts.splice(i, 1);
                    localSelectedWorkoutsToShow.splice(i, 1);
                    listOfExercisesSoFar.splice(i, 1)
                    break;
                }
                if (i === selectedExercises.length - 1) {
                    notFound = true;
                }
            }
            if (notFound) {
                localSelectedWorkouts.push(exercise.id)
                localSelectedWorkoutsToShow.push(exercise)
                listOfExercisesSoFar.push(putExerciseDetailsTogether(exercise))
            }
        } else if (localSelectedWorkouts.length === 0) {
            localSelectedWorkouts.push(exercise.id)
            localSelectedWorkoutsToShow.push(exercise)
            listOfExercisesSoFar.push(putExerciseDetailsTogether(exercise))
        }
        setSelectedExercisesToShow(localSelectedWorkoutsToShow)
        setSelectedExercises(localSelectedWorkouts);
        setListOfExercises(listOfExercisesSoFar)
    };

    const putExerciseDetailsTogether = (exercise) => {
        const localSet = {...customSets}
        localSet.exercise = exercise
        return localSet;
    }

    const handleOnCustomWorkoutChange = event => {
        setCustomWorkout({
            ...customWorkout,
            [event.target.id]: event.target.value
        });
    }

    const handleOnExerciseSetsChange = event => {
       setCustomSets({
           ...customSets,
        [event.target.id]: event.target.value
       })
    }

    const handleCreateCustomWorkout = async (event) => {
        event.preventDefault();
        let localCustomWorkout = {...customWorkout}
        localCustomWorkout.sets = listOfExercises
        const createdCustomWorkout = create(localCustomWorkout)
        setAllWorkouts( [...allWorkouts, createdCustomWorkout]);
        await updateWorkoutInGoal(profile.goal.id, allWorkouts)
    }
    return (
        <>
            <h1>Add Workouts to Goal</h1>
            <form onSubmit={handleCreateCustomWorkout}>
                <div>
                    <label>Name your custom program</label>
                    <input type={"text"}
                           required
                           placeholder={"Workout name"}
                           id={"name"}
                           onChange={handleOnCustomWorkoutChange}
                    />
                </div>
                <div>
                    <label>Select a category</label>
                    <select
                        id={"type"}
                        defaultValue={"Select category"}
                        onChange={handleOnCustomWorkoutChange}
                    >
                        <option value={"0"}>Select type</option>
                        <option value={"Upper body"}>Upper body</option>
                        <option value={"Lower body"}>Lower body</option>
                        <option value={"Stamina"}>Stamina</option>
                    </select>
                </div>

                <div>
                    {exercises &&
                    exercises.map((exercise) => (
                        <>
                            <h1 key={exercise.id}>{exercise.name}</h1>
                            <label>Repetitions</label>
                            <input type={"number"}

                                   placeholder={"Number of repetitions"}
                                   id={"exerciseRepetitions"}
                                   min={1}
                                   max={500}
                                   onChange={handleOnExerciseSetsChange}
                            />
                            <label>Difficutly 1-10</label>
                            <input type={"number"}

                            placeholder={"Rate difficulty1-10"}
                            id={"difficulty"}
                                   min={1}
                                   max={10}
                            onChange={handleOnExerciseSetsChange}/>
                            <button type={"button"} onClick={() => handleSelectingExercises(exercise)}>Add</button>
                        </>
                    ))}
                </div>

                <div>
                    <h4>Selected Exercises:</h4>
                    <ul>
                        {selectedExercisesToShow &&
                        selectedExercisesToShow.map((exercise) => (
                            <li key={exercise.id}>
                                {exercise.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <button type={"submit"}>Create Custom Program</button>
            </form>
        </>
    )
}

export default withKeycloak(CustomWorkout)