import React, {useState} from 'react';
import KeycloakService from "../../services/KeycloakService";
import {create, remove} from "../../api/ProfileAPI";
import AppContainer from "../../hoc/AppContainer";
import profilePicture from "../../images/mefit_orange.svg";
import styles from './Profile.module.css'

const Profile = ({profile}) => {

    const firstName = KeycloakService.getFirstName();
    const lastName = KeycloakService.getLastName();

    const deleteProfile = async (event) => {
        event.preventDefault();
        await remove(profile.id);
        alert('Profile deleted');
    };

    return (
        <>
            <img src={profilePicture} className={styles.profileImg} alt="profilepic" width="180" height="180"/>
            <h1>{firstName.charAt(0).toUpperCase() + firstName.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</h1>
            <p>Height: {profile.height} cm</p>
            <p>Weight: {profile.weight} kg</p>
            <p>BMI: {Math.round(profile.bmi * 10) / 10}</p>
            <button>My Workouts</button>
            <button>Update profile</button>
            <button onClick={deleteProfile}>Delete profile</button>
        </>
    );
};

export default Profile;