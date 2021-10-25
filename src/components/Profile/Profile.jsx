import React from 'react';
import KeycloakService from "../../services/KeycloakService";
import {remove} from "../../api/ProfileAPI";
import profilePicture from "../../images/mefit_notext.svg";
import {useHistory} from "react-router-dom";
import styles from './Profile.module.css';

const Profile = ({profile}) => {

    const history = useHistory();

    const firstName = KeycloakService.getFirstName();
    const lastName = KeycloakService.getLastName();
    const username = KeycloakService.getUsername();

    const onEditClick = () => {
        history.push("/profile/edit");
    };


    const deleteProfile = async (event) => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            event.preventDefault();
            await remove(profile.id);
            alert('Profile deleted');
            window.location.reload(false);
        }
    };

    return (
        <>
            <div className="customContainer">
                <div className={styles.profileCard} style={{width: "30rem"}}>
                    <div align="center" className="pb_1">
                        <img style={{width: "50%", marginTop: "2rem"}} src={profilePicture}
                             alt={"profile picture"} className={styles.profileImg}/>
                    </div>
                    <div className="card-body">
                        <h1>{firstName.charAt(0).toUpperCase() + firstName.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</h1>
                        <p>{username}</p>
                    </div>
                    <div className={styles.profileCard__body}>
                        <ul className="list-group list-group-flush">
                            <h5>Fitness level: {profile.fitnessScore}</h5>
                            <h5>{profile.height} cm</h5>
                            <h5>{profile.weight} kg</h5>
                            <h5>BMI {Math.round(profile.bmi * 10) / 10}</h5>
                        </ul>
                    </div>
                    <div className={styles.profileCard__body}>
                        <button className={styles.a} style={{color: "black", margin: "0.5rem"}} onClick={onEditClick}>Edit</button>
                        <button className={styles.a} style={{color: "red", margin: "0.5rem"}} onClick={deleteProfile}>Delete profile</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;