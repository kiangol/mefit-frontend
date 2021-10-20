import React from 'react';
import withKeycloak from "../hoc/withKeycloak";
import ProfileEdit from "../components/Profile/ProfileEdit";

const EditedProfile = () => {


    return (
        <>
            <ProfileEdit />
        </>
    )
}

export default withKeycloak(EditedProfile)