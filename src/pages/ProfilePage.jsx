import React, {useEffect, useState} from 'react';
import withKeycloak from "../hoc/withKeycloak";
import KeycloakService from "../services/KeycloakService";
import Profile from "../components/Profile/Profile";
import profilePicture from '../images/logo_notext.png';
import ProfileForm from "../components/Profile/ProfileForm";
import {listOne} from "../api/ProfileAPI";
import AppContainer from "../hoc/AppContainer";

const ProfilePage = () => {
    const name = KeycloakService.getFirstName()

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
            <AppContainer>
                {(!profile) && (
                    <>
                        <h1>You don't have a profile yet!</h1>
                        <h2>Create a profile</h2>
                        <ProfileForm/>
                    </>
                )}
                {(profile) && (
                    <>
                        <div align="center">
                            <h1>My Profile</h1>
                            <Profile profile={profile}/>
                        </div>
                    </>
                )}
            </AppContainer>
        </>
    );
};

export default withKeycloak(ProfilePage);