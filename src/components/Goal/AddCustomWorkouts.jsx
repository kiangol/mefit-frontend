import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/WorkoutAPI";
import {updateGoal} from "../../api/GoalAPI";

const AddCustomWorkouts = ({preWorkouts}) => {

    const [workouts, setWorkouts] = useState();
    const [selectedWorkouts, setSelectedWorkouts] = useState([...preWorkouts]);
    const [selectedWorkoutsToShow, setSelectedWorkoutsToShow] = useState([...preWorkouts]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error);
            } else {
                for (let i = 0; i < data.length; i++) {

                }
                setWorkouts(data);
            }
        };
        fetchWorkouts();
    }, [])

    const handleSelectingWorkouts = (workout) => {
        const localSelectedWorkouts = [...selectedWorkouts];
        const localSelectedWorkoutsToShow = [...selectedWorkoutsToShow];
        let notFound = false;
        if (localSelectedWorkouts.length !== 0) {
            for (let i = 0; i < selectedWorkouts.length; i++) {
                if (localSelectedWorkouts[i] === workout.id) {
                    localSelectedWorkouts.splice(i, 1);
                    localSelectedWorkoutsToShow.splice(i, 1);
                    break;
                }
                if (i === selectedWorkouts.length - 1) {
                    notFound = true;
                }
            }
            if (notFound) {
                localSelectedWorkouts.push(workout.id)
                localSelectedWorkoutsToShow.push(workout)
            }
        } else if (localSelectedWorkouts.length === 0) {
            localSelectedWorkouts.push(workout.id)
            localSelectedWorkoutsToShow.push(workout)
        }
        setSelectedWorkoutsToShow(localSelectedWorkoutsToShow)
        setSelectedWorkouts(localSelectedWorkouts);
    };

    const handleCreateCustomProgram = async (event) => {
        event.preventDefault();

       // await updateGoal(profile.id, selectedWorkouts)
    }
    return (
        <>
            <h1>Add Workouts to Goal</h1>
            <form onSubmit={handleCreateCustomProgram}>
                <div>
                    {workouts &&
                    workouts.map((workout) => (
                        <>
                            <h1 key={workout.id}>{workout.name}</h1>
                            <button type={"button"} onClick={() => handleSelectingWorkouts(workout)}>Add</button>
                        </>
                    ))}
                </div>
                <div>
                    <h4>Selected workouts:</h4>
                    <ul>
                        {selectedWorkoutsToShow &&
                        selectedWorkoutsToShow.map((workout) => (
                            <li key={workout.id}>
                                {workout.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <button type={"submit"}>Create Custom Program</button>
            </form>
        </>
    )
}

export default withKeycloak(AddCustomWorkouts)