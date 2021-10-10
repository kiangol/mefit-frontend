import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import {list} from "../api/WorkoutAPI";
import ExerciseItem from "../components/Exercise/ExerciseItem";

const Workouts = () => {

    const [workouts, setWorkouts] = useState();
    const [currentWorkouts, setCurrentWorkouts] = useState()
    const [workoutTypeMap, setWorkoutTypeMap] = useState()
    //const [workoutTypeMap, setWorkoutTypeMap] = useState()
    const workoutGroupedByType = new Map();
    const workoutTypes = new Set();

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
                setMuscleGroup(musclegroups);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <main>
                <select onChange={handleMuscleGroupSelect}>
                    <option key={"0"} value={"Show all"}>Show all</option>
                    {muscleGroup &&
                    [...muscleGroup].map((muscleGroup) => (
                            <option key={muscleGroup} value={muscleGroup}>{muscleGroup}</option>
                        )
                    )
                    }
                </select>
                <section>
                    <h1>Workouts</h1>
                    {currentWorkouts && (
                        <ExerciseItem list={currentWorkouts}/>
                    )}
                </section>
                <section>

                </section>
            </main>

        </>
    );
}

export default withKeycloak(Workouts);