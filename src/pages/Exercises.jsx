import React, {useEffect, useState} from 'react';

import {list} from "../api/ExerciseAPI";
import ExerciseList from "../components/Exercise/ExerciseList";
import withKeycloak from "../hoc/withKeycloak";
import styled from 'styled-components';
import {Modal} from '../components/Modal/Modal';


const Exercises = () => {
    const Container = styled.div`
      display: flex;
      justify-content: center;
      //align-items: center;
      //height: 100vh;
    `;

    const [exercises, setExercises] = useState();
    const [currentExercises, setCurrentExercises] = useState();
    const [muscleGroup, setMuscleGroup] = useState();
    const [muscleGroupMap1, setMuscleGroupMap1] = useState();
    const [error, setError] = useState();
    let musclegroups = new Set();
    const muscleGroupMap = new Map();

    const [showModal, setShowModal] = useState(false);
    const [clickedExercise, setClickedExercise] = useState();


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
                    musclegroups.add(exercise.targetMuscleGroup);
                    if (muscleGroupMap.has(exercise.targetMuscleGroup)) {
                        muscleGroupMap.get(exercise.targetMuscleGroup).push(exercise);
                    } else {
                        muscleGroupMap.set(exercise.targetMuscleGroup, [exercise]);
                    }
                }
                muscleGroupMap.set("Show all", data);

                setMuscleGroupMap1(muscleGroupMap);
                setMuscleGroup(musclegroups);
            }
        };
        fetchData();
    }, []);


    const handleMuscleGroupSelect = event => {
        console.log(muscleGroupMap1.get("Show all"));
        setCurrentExercises(muscleGroupMap1.get(event.target.value));
    };

    const openModal = exercise => {
        setClickedExercise(exercise);
        setShowModal(prev => !prev);
    };

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
                <Container>
                    {currentExercises && (
                        <ExerciseList list={currentExercises} clicker={openModal}/>
                    )}
                    <Modal showModal={showModal} setShowModal={setShowModal} exercise={clickedExercise}/>
                </Container>

            </main>

        </>
    );

};

export default withKeycloak(Exercises);