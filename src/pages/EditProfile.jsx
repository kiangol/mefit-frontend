import React, {useState, useEffect} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import ProfileEdit from "../components/Profile/ProfileEdit";
import styles from "../components/Profile/Profile.module.css";
import KeycloakService from "../services/KeycloakService";
import {listOne} from "../api/ProfileAPI";
import WorkoutList from "../components/Workout/WorkoutList";

const EditedProfile = () => {

    const [profile, setProfile] = useState();
    const [username] = useState({
        username: KeycloakService.getUsername()
    });

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

    return (
        <>
            {profile && (
                <ProfileEdit toEdit={profile}/>
            )}
        </>
    )
}

export default withKeycloak(EditedProfile)