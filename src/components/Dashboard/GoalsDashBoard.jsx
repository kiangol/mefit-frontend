import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import 'react-calendar/dist/Calendar.css';
import styles from "./GoalsDashBoard.module.css"
import {listOne} from "../../api/ProfileAPI";
import KeycloakService from "../../services/KeycloakService";
import StatusForOneGoal from "../Goal/StatusForOneGoal";
import {useHistory} from "react-router-dom";


const GoalsDashBoard = ({userGoal}) => {
    // set states of calendar date
    const [calDate, setCalDate] = useState(new Date())
    const history = useHistory()
    const [deadlineHours, setDeadlineHours] = useState()
    const [deadlineDays, setDeadlineDays] = useState()
    const [dateString, setDateString] = useState({
        endDate: new Date().toString()
    })
    const [username] = useState({
        username: KeycloakService.getUsername()
    });

    let hasGoal = true

    const onDateChange = event => {
        setDateString({
            ...dateString,
            [event.target.id]: event.target.value
        })
    }

    const daysToGoalDeadline = (date) => {
        var now = new Date().getTime();
        const dateConv = new Date("2021-10-29 12:00:00").getTime()

        var distance = dateConv - now
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);


        return new Array(days, hours)
    }

    function onSetGoalClick() {
        history.push("/goals")
    }

    function getMonth(monthInt) {
        switch (monthInt) {
            case 0:
                return "January"
            case 1:
                return "February"
            case 2:
                return "March"
            case 3:
                return "April"
            case 4:
                return "May"
            case 5:
                return "June"
            case 6:
                return "July"
            case 7:
                return "August"
            case 8:
                return "September"
            case 9:
                return "October"
            case 10:
                return "November"
            case 11:
                return "December"
            default:
                return "Unknown Month int"
        }
    }

    function getWeekday(weekDayInt) {
        switch (weekDayInt) {
            case 0:
                return "Monday"
            case 1:
                return "Tuesday"
            case 2:
                return "Wednesday"
            case 3:
                return "Thursday"
            case 4:
                return "Friday"
            case 5:
                return "Saturday"
            case 6:
                return "Sunday"
            default:
                return "Unknown weekday int"
        }
    }

    return (
        <>
            <div className={styles.container}>
                <section className={styles.row}>
                    <section className={styles.DateShower}>
                        <article className="col">
                            <div className="card-body">
                                <div className={styles.date}>
                                    <span className={styles.binds}></span>
                                    <span className={styles.weekday}>{getWeekday(calDate.getDay() - 1)}</span>
                                    <span className={styles.month}>{getMonth(calDate.getMonth())}</span>
                                    <h1 className={styles.day}>{calDate.getDate()}</h1>
                                </div>
                            </div>
                        </article>
                    </section>
                    <section>
                        <article className="col">
                            <div className="card-body">
                                {userGoal &&
                                <>

                                <section className={styles.DeadLine}>
                                    <article className={styles.DaysLeft}>
                                        <h1>Goal deadline</h1>
                                    </article>
                                    <article className={styles.DaysLeft}>
                                        <h3>Days:</h3>
                                        <div className={styles.date}>
                                        <span
                                            className={styles.countdown}>{userGoal && daysToGoalDeadline(userGoal.endDate)[0]}</span>
                                        </div>
                                    </article>
                                    <article className={styles.DaysLeft}>
                                        <h3>Hours:</h3>
                                        <div className={styles.date}>
                                        <span
                                            className={styles.countdown}>{userGoal && daysToGoalDeadline(userGoal.endDate)[1]}</span>
                                        </div>
                                    </article>
                                </section>
                                </>
                                }


                                {!userGoal &&
                                <>
                                    <h2>Goals</h2>
                                    <button onClick={onSetGoalClick}>Set Goal</button>
                                    <br/><br/>
                                </>
                                }
                            </div>
                        </article>
                        <article className={styles.StatusArea}>
                            <ul id="goalList">
                                {userGoal &&
                                <StatusForOneGoal goal={userGoal}/>
                                }
                            </ul>
                        </article>
                    </section>

                </section>

            </div>
        </>
    )
}
export default withKeycloak(GoalsDashBoard);