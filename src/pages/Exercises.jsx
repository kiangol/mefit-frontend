import React, {useEffect, useState} from 'react';

import {list} from "../api/ExerciseAPI";
import ExerciseData from "../DummyData/ExerciseData";
import ExerciseItem from "../components/Exercise/ExerciseItem";
import withKeycloak from "../hoc/withKeycloak";


const Exercises = () => {

    const [exercises, setExercises] = useState();
    const [error, setError] = useState();


    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await list();
            if (error) {
                console.log("ERROR IN ALLEXERCISES: " + error);
                setError(error);
                console.log(error);
            } else {
                setExercises(data);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <main>

                <section>
                    <h1>API:</h1>
                    {exercises && (
                        <ExerciseItem list={exercises} />
                    )}
                </section>
                <section>

                </section>
            </main>

        </>
    );
};

export default withKeycloak(Exercises);