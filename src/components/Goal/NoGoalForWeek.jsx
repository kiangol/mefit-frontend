import React, {useEffect, useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {list} from "../../api/ProgramAPI";
import {createGoal, updateGoal, updateWorkoutInGoal} from "../../api/GoalAPI";

const NoGoalForWeek = ({profile}) => {

    const [programs, setPrograms] = useState();
    const [workouts, setWorkouts] = useState();
    const [exercises, setExercises] = useState();
    const [goal, setGoal] = useState({
        endDate: "",
        achieved: false,
        program: "",
        workouts: []
    })

    useEffect(() => {
        const fetchPrograms = async () => {
            const {data, error} = await list();
            if (error) {
                console.log("programerror " + error)
            } else {
                setPrograms(data);
            }
        };
        fetchPrograms();
    }, [])

    const listProgramWorkoutsIds = (workouts) => {
        let listOfIds = [];
        for (let i = 0; i < workouts.length; i++) {
            listOfIds.push(workouts[i].id)
        }
        return listOfIds;
    }

    const handleSetProgramAsGoalClick = async program => {
        const newGoal = {...goal}
        const date = new Date()
        newGoal.endDate = date.setDate(date.getDate() + 6);
        newGoal.program = program.id;
        const createdGoal = await createGoal(newGoal);
        newGoal.workouts = listProgramWorkoutsIds(program.workouts);
        await updateWorkoutInGoal(createdGoal.data.id, newGoal.workouts)

        if (createdGoal) {
            await updateGoal(profile.id, createdGoal.data.id);
            window.location.reload("false");
        }
    }

    return (
        <>
            {programs &&
            programs.map((program) => (
                <>
                    <h4 key={program.name}>{program.name}</h4>
                    <p key={program.id}>Category: {program.category}</p>
                    <button key={program.category} type={"button"}
                            onClick={() => handleSetProgramAsGoalClick(program)}>Set as goal
                    </button>
                </>
            ))
            }
        </>
    )
}

export default withKeycloak(NoGoalForWeek);