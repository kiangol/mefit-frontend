import React, {useEffect, useState} from 'react';

import {list} from "../api/ExerciseAPI";
import ExerciseItem from "../components/Exercise/ExerciseItem";
import withKeycloak from "../hoc/withKeycloak";


const Exercises = () => {

    const [exercises, setExercises] = useState();
    const [currentExercises, setCurrentExercises] = useState();
    const [muscleGroup, setMuscleGroup] = useState();
    const [muscleGroupMap1, setMuscleGroupMap1] = useState();
    const [error, setError] = useState();
    let musclegroups = new Set();
    const muscleGroupMap = new Map();

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error);
                setError(error);
                console.log(error);
            } else {
                setExercises(data);
                setCurrentExercises(data);
                for (let exercise of data) {
                    musclegroups.add(exercise.targetMuscleGroup)
                    if (muscleGroupMap.has(exercise.targetMuscleGroup)){
                        muscleGroupMap.get(exercise.targetMuscleGroup).push(exercise);
                    } else {
                        muscleGroupMap.set(exercise.targetMuscleGroup, [exercise])
                    }
                }
                muscleGroupMap.set("Show all", data)

                setMuscleGroupMap1(muscleGroupMap)
                setMuscleGroup(musclegroups);
            }
        };
        fetchData();
    }, []);


    const handleMuscleGroupSelect = event => {
        console.log(muscleGroupMap1.get("Show all"))
       setCurrentExercises(muscleGroupMap1.get(event.target.value))
    }


// Legge muscle groups inn i et Set.
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
                    <h1>API:</h1>
                    {currentExercises && (
                        <ExerciseItem list={currentExercises}/>
                    )}
                </section>
                <section>

                </section>
            </main>

        </>
    );
};

export default withKeycloak(Exercises);