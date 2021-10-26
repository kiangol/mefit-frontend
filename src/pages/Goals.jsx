import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import {list, listOne} from "../api/ProfileAPI";
import styles from "../components/Goal/Goals.module.css"
import StatusForOneGoal from "../components/Goal/StatusForOneGoal";
import KeycloakService from "../services/KeycloakService";
import NoGoalForWeek from "../components/Goal/NoGoalForWeek";
import AddCustomWorkouts from "../components/Goal/CustomWorkout";
import Calendar from "react-calendar";


const Goals = () => {

    const [currentGoal, setCurrentGoal] = useState();
    const [goalInThisWeek, setGoalInThisWeek] = useState();
    const [profile, setProfile] = useState();

    const [goalDate, setGoalDate] = useState(new Date())
    const [calDate, setCalDate] = useState(new Date())

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
                if (data) {
                    setCurrentGoal(data.goal);
                    if (data.goal) {
                        setGoalInThisWeek(isGoalThisWeek(data.goal.endDate));
                    }
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

    function onChange(clickedDate) {
        // change results based on calendar date click
        setCalDate(calDate)

        const newResultFormat = new Date().toLocaleString().split(",")[0]
        const newCalDateFormat = clickedDate.toLocaleString().split(",")[0]
        setGoalDate(new Date(clickedDate))

        console.log(new Date(clickedDate).getDay())
        return newResultFormat === newCalDateFormat
    }

    function getMonth(monthInt) {
        switch (monthInt) {
            case 0:
                return "Jan"
            case 1:
                return "Feb"
            case 2:
                return "Mar"
            case 3:
                return "Apr"
            case 4:
                return "May"
            case 5:
                return "Jun"
            case 6:
                return "Jul"
            case 7:
                return "Aug"
            case 8:
                return "Sep"
            case 9:
                return "Oct"
            case 10:
                return "Nov"
            case 11:
                return "Dec"
            default:
                return "Unknown Month int"
        }
    }

    return (
        <>
            <section className={styles.GoalContainer}>
                <div className="calendar">
                    <Calendar className={"calendar_dash"} id={"endDate"} onChange={onChange} value={calDate}/>
                </div>

                {!currentGoal &&
                <NoGoalForWeek />
                }

                {currentGoal &&
                <StatusForOneGoal  goal={currentGoal}/>
                }

                {(goalInThisWeek || !currentGoal) &&
                <NoGoalForWeek profile={profile}/>
                }

                {currentGoal &&
                <AddCustomWorkouts preWorkouts={currentGoal.program.workouts}/>
                }
            </section>
        </>
    )
}

export default withKeycloak(Goals);