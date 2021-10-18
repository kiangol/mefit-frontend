import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/WorkoutAPI";

const CreateCustomProgram = () => {

    const [workouts, setWorkouts] = useState();
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [program, setProgram] = useState({
        "name" : "",
        "category": "",
        "goal": "",
        "workouts": [],
    })

    useEffect(() => {
        const fetchWorkouts = async () => {
            const {data, error} = await list();
            if(error) {
                console.log(error);
            } else {
                console.log("Workouts: " + JSON.stringify(data))
                setWorkouts(data);
            }
        };
        fetchWorkouts();
    }, [])

    const handleSelectingWorkouts = workout => {

    };

    return (
        <h1>CreateCustomProgram</h1>
    )
}

export default withKeycloak(CreateCustomProgram)