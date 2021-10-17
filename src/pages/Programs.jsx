import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import {list} from "../api/ProgramAPI";
import styled from "styled-components";
import ProgramList from "../components/Program/ProgramList";

const Programs = () => {
    const Container = styled.div`
      display: flex;
      justify-content: center;
      //align-items: center;
      //height: 100vh;
    `;

    const [programs, setPrograms] = useState();
    const [currentPrograms, setCurrentPrograms] = useState()
    const [categoryMap, setCategoryMap] = useState()
    const [programMap, setProgramMap] = useState()
    const [error, setError] = useState()
    const categories = new Set();
    const programGroupedByCategory = new Map();

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
        fetchData();
    }, []);

    const handleCategorySelect = event => {
        setCurrentPrograms(categoryMap.get(event.target.value))
    }

    return (
        <>
            <main>
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

                </section>
            </main>

        </>
    );
}

export default withKeycloak(Programs);