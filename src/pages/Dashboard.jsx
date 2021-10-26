import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import GoalsDashBoard from "../components/Dashboard/GoalsDashBoard";
import styled from "styled-components";
import {list} from "../api/ProgramAPI";
import ProgramList from "../components/Program/ProgramList";
import {listOne} from "../api/ProfileAPI";
import KeycloakService from "../services/KeycloakService";
import {Button} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";

const Dashboard = () => {
    const Container = styled.div`
      display: flex;
      justify-content: center;
      //align-items: center;
      //height: 100vh;
    `;

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

    const [profile, setProfile] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await listOne(username.username);
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setProfile(data);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {

        const fetchProfile = async () => {
            const {data, error} = await listOne(username.username);
            if (error) {
                console.log(error);
                setError(error);
                console.log(error);
            } else {
                setUserId(data);
            }
        };

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
                    if (data.name === "Beginner") {
                        console.log("dete")
                    }

                    if (programGroupedByCategory.has(program.category)) {
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
        fetchProfile();
        fetchData();
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
                <h1>Programs</h1>
                {currentPrograms && (
                    <ProgramList programList={currentPrograms}/>
                )}
            </section>
            <section>
                {!profile &&
                <>
                    <h2>Create a profile for more stuff here!</h2>
                    <Link to="/profile">
                        <Button className={"btn btn-warning btn-lg"}>Go to profile page</Button>
                    </Link>
                </>
                }
            </section>
        </>
    )
}

export default withKeycloak(Dashboard);