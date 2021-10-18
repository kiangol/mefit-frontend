import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import KeycloakService from "../services/KeycloakService";
import Profile from "../components/Profile/Profile";
import profilePicture from '../images/logo_notext.png';
import ProfileForm from "../components/Profile/ProfileForm";
import {listOne} from "../api/ProfileAPI";

const ProfilePage = () => {
    const name = KeycloakService.getName();

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
            <main>
                {(!profile) && (
                    <>
                        <ProfileForm/>
                    </>
                )}
                {(profile) && (
                    <>
                        <img src={profilePicture} alt="profilepic" width="180" height="180"/>
                        <h1>My Profile</h1>
                        <Profile name={name}/>
                        <button>Update profile</button>
                    </>
                )}
            </main>
        </>
    );
};

export default withKeycloak(ProfilePage);