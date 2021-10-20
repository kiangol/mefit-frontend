import React from 'react';
import withKeycloak from "../hoc/withKeycloak";

const Contributors = () => {

    const postToApi = event => {
        let _data = {
            name: "Jogging, 5 min",
            description: "Jog for 5 minutes",
            targetMuscleGroup: "Legs",
            requiresEquipment: false,
            image: "https://media.istockphoto.com/photos/happy-female-runner-jogging-in-the-morning-in-nature-picture-id1142900322?s=612x612",
            vidlink: "https://www.youtube.com/watch?v=VyJd4mynggY"
        }

        fetch('https://success-mefit.herokuapp.com/api/exercises', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    };

    return (
        <>
            <h1>Contributors</h1>
            <button type="button" onClick={postToApi}>CLICK</button>
        </>
    )
}

export default withKeycloak(Contributors);