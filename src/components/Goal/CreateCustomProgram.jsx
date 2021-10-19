import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/WorkoutAPI";

const CreateCustomProgram = () => {

    const [workouts, setWorkouts] = useState();
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [program, setProgram] = useState({
        "name": "",
        "category": "",
        "goal": "",
        "workouts": [],
    })

    useEffect(() => {
        const fetchWorkouts = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error);
            } else {
                //console.log("Workouts: " + JSON.stringify(data))
                setWorkouts(data);
            }
        };
        fetchWorkouts();
    }, [])

    const handleSelectingWorkouts = (workout) => {
        const localSelectedWorkouts = [...selectedWorkouts];
        for (let i = 0; i < localSelectedWorkouts.length; i++) {
            if (localSelectedWorkouts.workout[i].id === workout.id) {
                localSelectedWorkouts.splice(i, 1);
            } else {
                localSelectedWorkouts.push(workout);
            }
        }
        setSelectedWorkouts(localSelectedWorkouts);
    };

    const handleCreateCustomProgram = () => {
        //Call API and update
    }
    return (
        <>
            <h1>CreateCustomProgram</h1>
            <form>
            <label>Name your custom program</label>
            <input type={"text"} placeholder={"Program name"}/>
            <label>Select a category</label>
            <select value={value} defaultValue={"Beginner"}>
                <option value={"Beginner"}>Beginner</option>
                <option value={"Intermediate"}>Intermediate</option>
                <option value={"Advanced"}>Advanced</option>
                <option value={"Hard"}>Hard</option>
            </select>
                <button type={"submit"}>Create Custom Program</button>
            </form>
        </>
    )
}

export default withKeycloak(CreateCustomProgram)