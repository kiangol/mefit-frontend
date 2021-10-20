import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/WorkoutAPI";
import {createProgram} from "../../api/ProgramAPI";

const CreateCustomProgram = () => {

    const [workouts, setWorkouts] = useState();
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [selectedWorkoutsToShow, setSelectedWorkoutsToShow] = useState([]);
    const [program, setProgram] = useState({
        "name": "",
        "category": "",
        "publicised": true,
        "goal": [],
        "workouts": [],
    })

    useEffect(() => {
        const fetchWorkouts = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error);
            } else {
                setWorkouts(data);
            }
        };
        fetchWorkouts();
    }, [])

    const onCustomProgramChange = event => {
        setProgram({
            ...program,
            [event.target.id]: event.target.value
        });
    };

    const handleSelectingWorkouts = (workout) => {
        const localSelectedWorkouts = [...selectedWorkouts];
        const localSelectedWorkoutsToShow = [...selectedWorkoutsToShow];
        let notFound = false;
        if (localSelectedWorkouts.length !== 0) {
            for (let i = 0; i < selectedWorkouts.length; i++) {
                if (localSelectedWorkouts[i] === workout.id) {
                    localSelectedWorkouts.splice(i, 1);
                    localSelectedWorkoutsToShow.splice(i, 1);
                    break;
                }
                if (i === selectedWorkouts.length - 1) {
                    notFound = true;
                }
            }
            if (notFound) {
                localSelectedWorkouts.push(workout.id)
                localSelectedWorkoutsToShow.push(workout)
            }
        } else if (localSelectedWorkouts.length === 0) {
            localSelectedWorkouts.push(workout.id)
            localSelectedWorkoutsToShow.push(workout)
        }
        setSelectedWorkoutsToShow(localSelectedWorkoutsToShow)
        setSelectedWorkouts(localSelectedWorkouts);
    };

    const handleCreateCustomProgram = async (event) => {
        event.preventDefault();
        program.workouts = selectedWorkouts;
        await createProgram(program)
    }
    return (
        <>
            <h1>CreateCustomProgram</h1>
            <form onSubmit={handleCreateCustomProgram}>
                <div>
                    <label>Name your custom program</label>
                    <input type={"text"}
                           required
                           placeholder={"Program name"}
                           id={"name"}
                           onChange={onCustomProgramChange}
                    />
                </div>
                <div>
                    <label>Select a category</label>
                    <select
                        id={"category"}
                        defaultValue={"Select category"}
                        onChange={onCustomProgramChange}
                    >
                        <option value={"0"}>Select category</option>
                        <option value={"Beginner"}>Beginner</option>
                        <option value={"Intermediate"}>Intermediate</option>
                        <option value={"Advanced"}>Advanced</option>
                        <option value={"Hard"}>Hard</option>
                    </select>
                </div>
                <div>
                    {workouts &&
                    workouts.map((workout) => (
                        <>
                            <h1 key={workout.id}>{workout.name}</h1>
                            <button type={"button"} onClick={() => handleSelectingWorkouts(workout)}>Add</button>
                        </>
                    ))}
                </div>
                <div>
                    <h4>Selected workouts:</h4>
                    <ul>
                        {selectedWorkoutsToShow &&
                        selectedWorkoutsToShow.map((workout) => (
                            <li key={workout.id}>
                                {workout.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <button type={"submit"}>Create Custom Program</button>
            </form>
        </>
    )
}

export default withKeycloak(CreateCustomProgram)