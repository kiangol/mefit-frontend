import React, { useState } from 'react';
import withKeycloak from "../hoc/withKeycloak";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

var counter= 1;

const Goals = () => {
    // set states of calendar date
    let todayDate = new Date()
    const [calDate, setCalDate] = useState(new Date())
    const [dateString, setDateString] = useState({
        endDate: new Date().toString()
    })
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

    function onChange (calDate) {
        // change results based on calendar date click
        setCalDate(calDate)

        const newResultFormat = new Date().toLocaleString().split(",")[0]
        const newCalDateFormat = calDate.toLocaleString().split(",")[0]
        setDateString(newCalDateFormat.toString())
        //console.log(dateString+"conloe log")
        console.log(new Date(calDate*1000).getDate("en-US"))
        return newResultFormat === newCalDateFormat
    }


    return (
<>
    <h1>Goals</h1>

    <div className="calendar">
        <Calendar id={"endDate"} onChange={onChange} value={calDate} />
    </div>

    <button onClick={addelement}>Add new Goal</button>

    <br/><br/>
    <ul id="goalList">
        <h2>Your goals</h2>
    </ul>
</>
    )
}
export default withKeycloak(Goals);