import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/ProgramAPI";
import {updateGoal} from "../../api/GoalAPI";
import {useHistory} from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";
import {listOne} from "../../api/ProfileAPI";

const NoGoalForWeek = () => {

    const history = useHistory();
    const [profile, setProfile] = useState();
    const [programs, setPrograms] = useState();
    const [workouts, setWorkouts] = useState();
    const [exercises, setExercises] = useState();
    const [goal, setGoal] = useState({
        "endDate": "",
        "achieved": false,
        "program": "",
        "workouts": []
    })
    const [username] = useState({
        username: KeycloakService.getUsername()
    })

    useEffect(() => {
        const fetchProfile = async () => {
            const {data, error} = await listOne(username.username);
            if (error) {
                console.log("error " + error)
            } else {
                console.log("profile " + JSON.stringify(data))
                setProfile(data);
            }
        }
        const fetchPrograms = async () => {
            const {data, error} = await list();
            if (error) {
                console.log("programerror " + error)
            } else {
                setPrograms(data);
            }
        };
        fetchPrograms();
        fetchProfile();
    }, [])

    const handleSetProgramAsGoalClick = async program => {
        const newGoal = {...goal}
        newGoal.program = program
        await updateGoal(profile.id, newGoal);
        console.log("STRINGYFYYYY "+JSON.stringify(program));
        //goToGoalsPage();
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