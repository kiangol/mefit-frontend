import React, {useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {update} from '../../api/ProfileAPI';
import KeycloakService from "../../services/KeycloakService";
import {useHistory} from "react-router-dom";

const ProfileQuestionnaire = ({toEdit}) => {

    const history = useHistory();

    const [profile, setProfile] = useState({
        //id: toEdit.id,
        score: ""
    });


    const onNewProfileChange = event => {
        setProfile({
            ...profile,
            [event.target.id]: event.target.value
        });
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();
        await update(profile);
        alert('Profile updated');
        history.push("/profile")
    };


    return (

        <>
            <form onSubmit={onFormSubmit}>
                <div className="form-group" align="center">
                    <div className="form-group col-md-6">
                        <p>Do you smoke?</p>
                        <select>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">


                    </div>
                    <div className="form-group col-md-6">

                    </div>
                    <div className="form-group col-md-6">

                    </div>
                </div>
                <br/>
                <button type={"submit"} className={"btn btn-primary btn-lg"}>Update</button>
            </form>
        </>
    );
};

export default withKeycloak(ProfileQuestionnaire);