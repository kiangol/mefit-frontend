import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import GoalsDashBoard from "../components/Dashboard/GoalsDashBoard";
import {list} from "../api/ProgramAPI";
import ProgramList from "../components/Program/ProgramList";
import {listOne} from "../api/ProfileAPI";
import KeycloakService from "../services/KeycloakService";

const Dashboard = () => {

    const [userId, setUserId] = useState()
    const [programs, setPrograms] = useState();
    const [currentPrograms, setCurrentPrograms] = useState()
    const [categoryMap, setCategoryMap] = useState()
    const [programMap, setProgramMap] = useState()
    const [error, setError] = useState()
    const categories = new Set();
    const programGroupedByCategory = new Map();

    const [bmiHigh, setBmiHigh] = useState()
    const [bmiNormal, setBmiNormal] = useState()
    const [userBMI, setuserBMI] = useState()

    const [username] = useState({
        username: KeycloakService.getUsername()
    });

    useEffect(() => {

        const fetchData = async () => {
            const {data, error} = await list();
            if (error) {
                console.log(error);
                setError(error);
                console.log(error);
            } else {
                setPrograms(data);
                setCurrentPrograms(data);
                for (let program of data) {
                    categories.add(program.category)
                    console.log(program.name)
                    if (data.name === "Beginner"){
                        console.log("dete")}

                    if (programGroupedByCategory.has(program.category)){
                        programGroupedByCategory.get(program.category).push(program);
                    } else {
                        programGroupedByCategory.set(program.category, [program])
                    }
                }
                programGroupedByCategory.set("Show all", data)

                setCategoryMap(programGroupedByCategory)
                setProgramMap(categories);
            }
        };

        const fetchProfile = async () => {
            const {data, error} = await listOne(username.username)
            if (error) {
                setError(error)
                console.log(error)
            } else {
                    setUserId(data)
                try {
                    setuserBMI(userId.bmi.valueOf())
                    if (userBMI > 24){
                        setBmiHigh(true)
                        console.log(programs.name.valueOf())
                        for (const program in programs) {
                        /*    console.log("ert")
                            console.log(program.toString())
                            console.log(program.name.valueOf())
                        */}
                    } else {
                        setBmiNormal(true)
                    }
                } catch (error) {
                    setError(error)
                    console.log(error)
                }
            }
        }
        fetchData();
        fetchProfile()
    }, []);

    const handleCategorySelect = event => {
        setCurrentPrograms(categoryMap.get(event.target.value))
    }

    return (
        <>
        <h1>Dashboard</h1>
            {userId &&
            <GoalsDashBoard userGoal={userId.goal}/>
            }
            <select onChange={handleCategorySelect}>
                <option key={"0"} value={"Show all"}>Show all</option>
                {programMap &&
                [...programMap].map((category) => (
                        <option key={category} value={category}>{category}</option>
                    )
                )
                }
            </select>
            <section>
                <h1>Suggested programs</h1>
                {currentPrograms && (
                    <ProgramList programList={currentPrograms}/>
                )}
            </section>
            <section>

            </section>
        </>
    )
}

export default withKeycloak(Dashboard);