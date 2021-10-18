import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import {list, listOne} from "../api/ProfileAPI";
import StatusForOneGoal from "../components/Goal/StatusForOneGoal";
import KeycloakService from "../services/KeycloakService";
import PreviousGoals from "../components/Goal/PreviousGoals";
import NoGoalForWeek from "../components/Goal/NoGoalForWeek";
import CreateCustomProgram from "../components/Goal/CreateCustomProgram";


const Goals = () => {
    const [test, setTest] = useState({
        "id": 2,
        "endDate": "2021-10-11T10:08:40+0000",
        "achieved": true,
        "program": {
            "id": 2
        },
        "workouts": [
            {
                "id": 1,
                "name": "Just do it",
                "type": "Upper body day",
                "complete": false,
                "sets": [],
                "goals": [],
                "programs": []
            },
            {
                "id": 2,
                "name": "Don't stop",
                "type": "Lower body day",
                "complete": true,
                "sets": [],
                "goals": [],
                "programs": []
            }]

    })
    const [achievedGoals, setAchievedGoals] = useState([]);
    const [currentGoal, setCurrentGoal] = useState();
    const [goalInThisWeek, setGoalInThisWeek] = useState();
    const [username] = useState({
        username: "kian@test.no"
    });

    const [error, setError] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            const {data, error} = await listOne(username.username);
            if (error) {
                console.log(error)
            } else {
                console.log(data.goal)
                setCurrentGoal(data.goal)
            }
        }
        /* const fetchData = async () => {
             const achievedGoals = [];
             const {data, error} = await listOne(6);
             if (error) {
                 console.log(error);
                 setError(error)
             } else {

                 for (let goal of data) {
                     if (!goal.achieved) {
                         setCurrentGoal(goal)
                     } else {
                         achievedGoals.push([
                             ...achievedGoals,
                             goal
                         ])
                     }
                 }
                 setAchievedGoals(achievedGoals)

             }
         };
         */
        const setDate = () => {
            setGoalInThisWeek(isGoalThisWeek(test.endDate));
        }
        //fetchData();
        //fetchProfile();
        //setDate()
    }, [])

    const isGoalThisWeek = (date) => {

        const dateOfGoal = new Date(date);
        const dateObj = new Date();
        const today = dateObj;
        const week = new Date(today);
        week.setDate(week.getDate() - 6)

        console.log("Date of goal " + dateOfGoal)
        console.log("Dateobj " + dateObj)
        console.log("Today " + today)
        console.log("Week " + week)
        console.log(dateOfGoal <= week)

        return dateOfGoal <= week;

        /*

                const dateOfGoal = new Date(date).getDate();
                const dateObj = new Date();
                const todayDate = dateObj.getDate();
                const todayDay = dateObj.getDay();
                const firstDayOfTheWeek = new Date(dateObj.setDate(todayDate-todayDay))
                const lastDayOfTheWeek = new Date(firstDayOfTheWeek)
                lastDayOfTheWeek.setDate(lastDayOfTheWeek.getDate() + 6)
                return dateOfGoal >= firstDayOfTheWeek && dateOfGoal <= lastDayOfTheWeek;

         */

    }

    return (
        <>
            {!goalInThisWeek &&
            <>
                <NoGoalForWeek/>
                <CreateCustomProgram />
            </>
            }
            {(!test && !goalInThisWeek) &&
            <StatusForOneGoal goal={currentGoal}/>
            }
            {achievedGoals &&
            <PreviousGoals goals={achievedGoals}/>
            }
        </>
    )
}

export default withKeycloak(Goals);