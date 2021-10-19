import React, {useEffect, useState} from 'react';
import {list} from "../../api/WorkoutAPI";
import styles from './Program.module.css';
import ProgramItem from "./ProgramItem";




const ProgramList = ({programList}) => {

    const [workouts, setWorkouts] = useState();
    const [error, setError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error);
                setError(error);
                console.log(error);
            } else {
                setWorkouts(data);
            }
        };
        fetchData();
    }, []);

    return (
        <ul className={styles.programList}>
            {workouts && (
                programList.map((program) => (
                        <ProgramItem key={program.id} program={program} workoutsList={workouts}/>
                    ))
            )}
        </ul>
    );
};

export default ProgramList;