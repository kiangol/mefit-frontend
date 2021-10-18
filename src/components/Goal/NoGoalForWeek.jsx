import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/ProgramAPI";
import {create} from "../../api/GoalAPI";
import {useHistory} from "react-router-dom";

const NoGoalForWeek = () => {

    const history = useHistory();
    const [programs, setPrograms] = useState();
    const [workouts, setWorkouts] = useState();
    const [exercises, setExercises] = useState();

    const [goal, setGoal] = useState({
        "endDate": "",
        "achieved": false,
        "program": "",
        "workouts": []
    })

    useEffect(() => {
        const fetchPrograms = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error)
            } else {
                setPrograms(data);
            }
        };
        fetchPrograms()
    }, [])

    const handleSetProgramAsGoalClick = async program => {
        const newGoal = {...goal}
        newGoal.program = program.id;
        await create(newGoal);
        goToGoalsPage();
    }

    const goToGoalsPage = () => {
        history.push("/goals");
    }

    return (
        <>
            {programs &&
                programs.map((program) => (
                <div>
                    <h4>{program.name}</h4>
                    <p>Category: {program.category}</p>
                    <button type={"button"} onClick={() => handleSetProgramAsGoalClick(program)}>Set as goal</button>
                </div>
                ))

            }
            <h1>Create Custom Program</h1>
        </>
    )
}

export default withKeycloak(NoGoalForWeek);