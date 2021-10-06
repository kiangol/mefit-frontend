import React, {useState} from 'react';
import ExerciseData from "../DummyData/ExerciseData";
import ExerciseItem from "../components/Exercise/ExerciseItem";

const AllExercises = () => {

    const [exercises, setExercises] = useState(ExerciseData);

    return (
        <ExerciseItem list={exercises} />
    )
};

export default AllExercises;