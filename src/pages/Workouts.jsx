import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import withKeycloak from "../hoc/withKeycloak";
import {list} from "../api/WorkoutAPI";
import styled from "styled-components";
import WorkoutList from "../components/Workout/WorkoutList";
import {Modal} from "../components/Modal/Modal";

const Workouts = () => {


    const [workouts, setWorkouts] = useState();
    const [currentWorkouts, setCurrentWorkouts] = useState()
    const [workoutTypeMap, setWorkoutTypeMap] = useState()
    const [workoutMap, setWorkoutMap] = useState()
    const [error, setError] = useState()
    const [showModal, setShowModal] = useState(false);
    const [clickedExercise, setClickedExercise] = useState();
    const workoutTypes = new Set();
    const workoutGroupedByType = new Map();
    const history = useHistory();

    const Container = styled.div`
      display: flex;
      justify-content: center;
      //align-items: center;
      //height: 100vh;
    `;

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
                    //workouts.get(workout).sets = workouts.get(workout).sets.json()
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

    const openModal = exercise => {
        setClickedExercise(exercise);
        setShowModal(prev => !prev);
    };

    const handleNewWorkoutClick = () => {
       // history.push("/workouts/create")
        // create(goal)
        // fetchdata();
    }
        return (
        <>
            <main>
                <section>
                    <select onChange={handleMuscleGroupSelect}>
                        <option key={"0"} value={"Show all"}>Show all</option>
                        {workoutMap &&
                        [...workoutMap].map((type) => (
                                <option key={type} value={type}>{type}</option>
                            )
                        )
                        }
                    </select>
                    <button type={"button"} onClick={handleNewWorkoutClick} >Create new Workout</button>
                </section>
                <section>
                    <h1>Workouts</h1>
                        {currentWorkouts && (
                            <WorkoutList list={currentWorkouts} exerciseClicked={openModal}/>
                        )}
                </section>
                <section>

                </section>
            </main>

        </>
    );
}

export default withKeycloak(Workouts);