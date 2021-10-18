import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { listOne } from "../api/ProfileAPI";
import KeycloakService from "../services/KeycloakService";


var counter= 1;
const loggedIn = KeycloakService.isLoggedIn()
let hasGoal = false

const GoalsDashBoard = () => {
    // set states of calendar date
    const [goalDate, setGoalDate] = useState(new Date())
    const [calDate, setCalDate] = useState(new Date())
    const [userGoal, setUserGoal] = useState()

    const [error, setError] = useState()
    const [userId, setUserId] = useState()
    const [dateString, setDateString] = useState({
        endDate: new Date().toString()
    })
    const [username] = useState({
        username: KeycloakService.getUsername()
    });

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await listOne(username.username);
            if (error) {
                console.log(error);
                setError(error);
                console.log(error);
            } else {
                setUserId(data);
                try {
                    setUserGoal(data.goal)
                    hasGoal = true
                } catch (error) {
                    console.log(error)
                    setError(error)
                }
/*              for listing goals
                for (let goal of data) {
                    workoutTypes.add(workout.type)
                    if (workoutGroupedByType.has(workout.type)){
                        workoutGroupedByType.get(workout.type).push(workout);
                    } else {
                        workoutGroupedByType.set(workout.type, [workout])
                    }
                }
                workoutGroupedByType.set("Show all", data)

                setWorkoutTypeMap(workoutGroupedByType)
                setWorkoutMap(workoutTypes);*/
            }
        };
        fetchData();
    }, []);

     const onDateChange = event => {
        setDateString({
            ...dateString,
            [event.target.id]: event.target.value
        })
    }

    function addelement() {
        var completelist= document.getElementById("goalList");
        completelist.innerHTML += "<li>Goal " + counter + ": deadline: " + goalDate.getDate() + " " + getMonth(goalDate.getMonth()) +"</li>";
        counter++;
    }

    function getMonth(monthInt){
         switch (monthInt){
             case 0: return "Jan"
             case 1: return "Feb"
             case 2: return "Mar"
             case 3: return "Apr"
             case 4: return "May"
             case 5: return "Jun"
             case 6: return "Jul"
             case 7: return "Aug"
             case 8: return "Sep"
             case 9: return "Oct"
             case 10:return "Nov"
             case 11:return "Dec"
             default: return "Unknown Month int"
         }
    }


    function onChange (clickedDate) {
        // change results based on calendar date click
        setCalDate(calDate)

        const newResultFormat = new Date().toLocaleString().split(",")[0]
        const newCalDateFormat = clickedDate.toLocaleString().split(",")[0]
        setGoalDate(new Date(clickedDate))

        console.log(new Date(clickedDate).getDay())
        return newResultFormat === newCalDateFormat
    }


    return (
<>
    <div className="container">
        <section className="row">
            <article className="col">
                <div className="card-body">
                    <div className="calendar">
                        <Calendar id={"endDate"} onChange={onChange} value={calDate} />
                    </div>
                </div>
            </article>
            <article className="col">
                    <div className="card-body">
                        <h2>Goals</h2>
                        <button onClick={addelement} value={goalDate}>Set Goal</button>
                        <br/><br/>
                        <ul id="goalList">
                            {hasGoal && <>
                            <h2>Your goals</h2>
                            <p>{userGoal}</p>
                            </>
                            }
                            {!hasGoal && <> <p>You have no Goals</p></>}
                        </ul>
                    </div>
            </article>
        </section>
    </div>
</>
    )
}
export default withKeycloak(GoalsDashBoard);