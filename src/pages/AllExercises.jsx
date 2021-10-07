import React, {useEffect, useState} from 'react';

import {list} from "../api/ExerciseAPI";
import ExerciseData from "../DummyData/ExerciseData";
import ExerciseItem from "../components/Exercise/ExerciseItem";
import withKeycloak from "../hoc/withKeycloak";


const AllExercises = () => {

    const [exercisesDum] = useState(ExerciseData);
    const [exercises, setExercises] = useState();
    const [error, setError] = useState();


    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await list();
            if (error) {
                console.log("ERROR IN ALLEXERCISES: " + error);
                setError(error);
            } else {
                setExercises(data);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <h1>API:</h1>
            {exercises && (
                <ExerciseItem list={exercises} />
            )}

            <h1>DummyData:</h1>

        </>
    );
};

export default withKeycloak(AllExercises);