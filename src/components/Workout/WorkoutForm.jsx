import React, {useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {create} from '../../api/WorkoutAPI';

const WorkoutForm = () => {

    const [workout, setWorkout] = useState({
        name: '',
        type: '',
        completed: '',
    })


    const onNewWorkoutChange = event => {
        setWorkout({
            ...workout,
            [event.target.id]: event.target.value
        })
    }

    const onFormSubmit = async (event) => {
        event.preventDefault()
        await create(workout)
        alert('Workout created');
    }


    return (

        <>
            <form onSubmit={onFormSubmit}>
                <h1>Create a new workout</h1>

                <div className={"mb-3"} >
                    <label htmlFor={"name"} className={"form-label"} >Name</label>
                    <input id={"name"}
                           type={"text"}
                           placeholder={"Enter name"}
                           className={"form-control"}
                           onChange={onNewWorkoutChange}
                    />
                </div>

                <div className={"mb-3"} >
                    <label htmlFor={"type"} className={"form-label"} >Type</label>
                    <input id={"type"}
                           type={"text"}
                           placeholder={"Enter type"}
                           className={"form-control"}
                           onChange={onNewWorkoutChange}
                    />
                </div>

                <button type={"submit"} className={"btn btn-primary btn-lg"}>Create</button>

            </form>


        </>

    )

}

export default withKeycloak(WorkoutForm)