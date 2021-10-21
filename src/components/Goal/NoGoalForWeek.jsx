import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/ProgramAPI";
import {createGoal, updateGoal, updateWorkoutInGoal} from "../../api/GoalAPI";
import {useHistory} from "react-router-dom";
import KeycloakService from "../../services/KeycloakService";
import {listOne} from "../../api/ProfileAPI";
import {updateWorkout} from "../../api/WorkoutAPI";

const NoGoalForWeek = () => {

    const history = useHistory();
    const [profile, setProfile] = useState();
    const [programs, setPrograms] = useState();
    const [workouts, setWorkouts] = useState();
    const [exercises, setExercises] = useState();
    const [goal, setGoal] = useState({
        endDate: "",
        achieved: false,
        program: "",
        workouts: []
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

    const listProgramWorkoutsIds = (workouts) => {
        let listOfIds = [];
        for (let i = 0; i < workouts.length; i++) {
            listOfIds.push(workouts[i].id)
        }
        return listOfIds;
    }

    const handleSetProgramAsGoalClick = async program => {
        const newGoal = {...goal}
        newGoal.endDate = new Date();
        newGoal.program = program.id;
        const createdGoal = await createGoal(newGoal);
        newGoal.workouts = listProgramWorkoutsIds(program.workouts);
        await updateWorkoutInGoal(createdGoal.data.id, newGoal.workouts)

        if (createdGoal) {
            await updateGoal(profile.id, createdGoal.data.id);
        }
    }

    const goToGoalsPage = () => {
        history.push("/goals");
    }

    return (
        <>
            {programs &&
            programs.map((program) => (
                <>
                    <h4 key={program.name}>{program.name}</h4>
                    <p key={program.id}>Category: {program.category}</p>
                    <button key={program.category} type={"button"}
                            onClick={() => handleSetProgramAsGoalClick(program)}>Set as goal
                    </button>
                </>
            ))
            }
        </>
    )
}

export default withKeycloak(NoGoalForWeek);