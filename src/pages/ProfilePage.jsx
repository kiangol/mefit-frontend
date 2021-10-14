import React from 'react';
import withKeycloak from "../hoc/withKeycloak";
import KeycloakService from "../services/KeycloakService";
import Profile from "../components/Profile/Profile";
import profilePicture from '../images/logo_notext.png'

const ProfilePage = () => {
    const name = KeycloakService.getName();
    return (
        <>
            <main>
                <img src={profilePicture} alt="profilepic" width="180" height="180"/>
                <h1>My Profile</h1>
                <Profile name={name}/>
                <button>Update profile</button>
            </main>
        </>
    );
};

export default withKeycloak(ProfilePage);