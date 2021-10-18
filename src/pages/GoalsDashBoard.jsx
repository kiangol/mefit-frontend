import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { goal } from "../api/GoalDashboardAPI";


var counter= 1;
//const loggedIn = KeycloakService.getName()

const GoalsDashBoard = () => {
    // set states of calendar date
    let todayDate = new Date()
    const [goalOne, setGoalOne] = useState()
    const [error, setError] = useState()
    const [calDate, setCalDate] = useState(new Date())
    const [dateString, setDateString] = useState({
        endDate: new Date().toString()
    })

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await goal(1);
            if (error) {
                console.log(error);
                setError(error);
                console.log(error);
            } else {
                setGoalOne(data);
                /*
                for (let workout of data) {
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
        completelist.innerHTML += "<li>Goal " + counter + ": deadline: " + dateString + "</li>";
        counter++;
    }


    function onChange (clickedDate) {
        // change results based on calendar date click
        setCalDate(calDate)

        const newResultFormat = new Date().toLocaleString().split(",")[0]
        const newCalDateFormat = clickedDate.toLocaleString().split(",")[0]
        setDateString(newCalDateFormat.toString())
        //console.log(dateString+"conloe log")
        console.log(new Date(clickedDate).getDate())
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
                        <button onClick={addelement}>Set Goal</button>
                        <br/><br/>
                        <ul id="goalList">
                            <h2>Your goals</h2>
                            <p>You have no Goals</p>
                        </ul>
                    </div>
            </article>
        </section>
    </div>
</>
    )
}
export default withKeycloak(GoalsDashBoard);