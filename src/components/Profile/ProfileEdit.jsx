import React, {useState} from 'react';
import withKeycloak from "../../hoc/withKeycloak";
import {update} from '../../api/ProfileAPI';
import KeycloakService from "../../services/KeycloakService";
import {useHistory} from "react-router-dom";

const ProfileEdit = ({toEdit}) => {

    const history = useHistory();

    const [profile, setProfile] = useState({
        id: toEdit.id,
        username: KeycloakService.getUsername(),
        weight: toEdit.weight,
        height: toEdit.height,
        medicalConditions: toEdit.medicalConditions,
        disabilities: toEdit.disabilities,
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
                <div className="form-group">
                    <div className="form-group col-md-6">
                        <label htmlFor="height">Height</label>
                        <input type="number"
                               required
                               className="form-control"
                               id="height"
                               placeholder="Height in cm"
                               defaultValue={toEdit.height}
                               onChange={onNewProfileChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="weight">Weight</label>
                        <input type="number"
                               required
                               className="form-control"
                               id="weight"
                               placeholder="Weight in kg"
                               defaultValue={toEdit.weight}
                               onChange={onNewProfileChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="disabilities">Disabilities</label>
                        <input type="text"
                               className="form-control"
                               id="disabilities"
                               placeholder="Disabilities, separated by comma"
                               defaultValue={toEdit.disabilities}
                               onChange={onNewProfileChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="medicalConditions">Medical conditions</label>
                        <input type="text"
                               className="form-control"
                               id="medicalConditions"
                               placeholder="Medical conditions, separated by comma"
                               defaultValue={toEdit.medicalConditions}
                               onChange={onNewProfileChange}
                        />
                    </div>
                </div>
                <br/>
                <button type={"submit"} className={"btn btn-primary btn-lg"}>Update</button>
            </form>
        </>
    );
};

export default withKeycloak(ProfileEdit);