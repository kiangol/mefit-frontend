import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import {list} from "../api/WorkoutAPI";
import WorkoutList from "../components/Workout/WorkoutList";

const Workouts = () => {

    const [workouts, setWorkouts] = useState();
    const [currentWorkouts, setCurrentWorkouts] = useState()
    const [workoutTypeMap, setWorkoutTypeMap] = useState()
    const [workoutMap, setWorkoutMap] = useState()
    const [error, setError] = useState()
    const workoutTypes = new Set();
    const workoutGroupedByType = new Map();

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error);
                setError(error);
                console.log(error);
            } else {
                setWorkouts(data);
                setCurrentWorkouts(data);
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
                setWorkoutMap(workoutTypes);
            }
        };
        fetchData();
    }, []);

    const handleMuscleGroupSelect = event => {
        setCurrentWorkouts(workoutTypeMap.get(event.target.value))
    }

    return (
        <>
            <main>
                <select onChange={handleMuscleGroupSelect}>
                    <option key={"0"} value={"Show all"}>Show all</option>
                    {workoutMap &&
                    [...workoutMap].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        )
                    )
                    }
                </select>
                <section>
                    <h1>Workouts</h1>
                    {currentWorkouts && (
                        <WorkoutList list={currentWorkouts}/>
                    )}
                </section>
                <section>

                </section>
            </main>

        </>
    );
}

export default withKeycloak(Workouts);