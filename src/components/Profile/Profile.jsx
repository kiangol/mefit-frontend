import React from 'react';
import KeycloakService from "../../services/KeycloakService";
import {remove} from "../../api/ProfileAPI";
import profilePicture from "../../images/mefit_orange.svg";
import {useHistory} from "react-router-dom";
import styles from './Profile.module.css';
import {Button} from "react-bootstrap";

const Profile = ({profile}) => {

    const history = useHistory();

    const firstName = KeycloakService.getFirstName();
    const lastName = KeycloakService.getLastName();

    const onEditClick = () => {

    };

    const deleteProfile = async (event) => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            event.preventDefault();
            await remove(profile.id);
            alert('Profile deleted');
        }
    };

    return (
        <>
            <div className={styles.profileCard} style={{width: "30rem"}}>
                <div align="center">
                    <img style={{width: "50%", marginTop: "2rem"}} src={profilePicture}
                         alt={"profile picture"}/>
                </div>
                <div className="card-body">
                    <h1>{firstName.charAt(0).toUpperCase() + firstName.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</h1>
                </div>
                <div className={styles.profileCard__body}>
                    <ul className="list-group list-group-flush">
                        <h5>{profile.height} cm</h5>
                        <h5>{profile.weight} kg</h5>
                        <h5>BMI {Math.round(profile.bmi * 10) / 10}</h5>
                    </ul>
                </div>
                <div className={styles.profileCard__body}>
                    <a href="#" className={styles.a} style={{margin:"1rem"}} onClick={() => history.push("/profile/edit")}>Edit</a>
                    <a href="#" className={styles.a} style={{color: "red", margin:"1rem"}} onClick={deleteProfile}>Delete profile</a>
                </div>
            </div>
        </>
    );
};

export default Profile;