import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import {list, listOne} from "../api/GoalAPI";
import StatusForOneGoal from "../components/Goal/StatusForOneGoal";
import KeycloakService from "../services/KeycloakService";
import PreviousGoals from "../components/Goal/PreviousGoals";


const Goals = () => {
    const [test, setTest] = useState({
        "id": 2,
        "endDate": "2021-10-13T10:08:40+0000",
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
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const achievedGoals = {
                id: KeycloakService.getUsername()
            };
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
                console.log(data)
            }
        };
        //fetchData();
        console.log(test)
    }, [])

    return (
        <>
            {test &&
            <StatusForOneGoal goal={test}/>
            }
            {achievedGoals &&
            <PreviousGoals goals={achievedGoals}/>
            }
        </>
    )
}

export default withKeycloak(Goals);