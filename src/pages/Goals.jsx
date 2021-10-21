import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import {list, listOne} from "../api/ProfileAPI";
import StatusForOneGoal from "../components/Goal/StatusForOneGoal";
import KeycloakService from "../services/KeycloakService";
import NoGoalForWeek from "../components/Goal/NoGoalForWeek";
import CreateCustomProgram from "../components/Goal/AddCustomWorkouts";
import AddCustomWorkouts from "../components/Goal/AddCustomWorkouts";


const Goals = () => {

    const [currentGoal, setCurrentGoal] = useState();
    const [goalInThisWeek, setGoalInThisWeek] = useState();
    const [profile, setProfile] = useState();
    const [username] = useState({
        username: KeycloakService.getUsername()
    });
    const [error, setError] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            const {data, error} = await listOne(username.username);
            if (error) {
                console.log(error)
            } else {
                setProfile(data);
                if(data.goal !== null) {
                    setCurrentGoal(data.goal);
                    setGoalInThisWeek(isGoalThisWeek(data.goal.endDate));
                }
            }
        };
        fetchProfile();
    }, []);


    const isGoalThisWeek = (date) => {

        const dateOfGoal = new Date(date);
        const dateObj = new Date();
        const today = dateObj;
        const week = new Date(today);
        week.setDate(week.getDate() - 6)
        return dateOfGoal <= week;
    }

    return (
        <>
            {!goalInThisWeek &&
            <NoGoalForWeek/>
            }

            {currentGoal &&
            <AddCustomWorkouts preWorkouts={currentGoal.program.workouts}/>
            }

            {(currentGoal && !goalInThisWeek) &&
            <StatusForOneGoal goal={currentGoal}/>
            }
        </>
    )
}

export default withKeycloak(Goals);