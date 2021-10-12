import React from 'react';
import withKeycloak from "../../hoc/withKeycloak";

const WorkoutForm = () => {




    return (

        <>
            <form>
                <h1>Create a new workout</h1>

                <div className={"mb-3"} >
                    <label htmlFor={"title"} className={"form-label"} >Title</label>
                    <input id={"title"}
                           type={"text"}
                           placeholder={"Enter workout title"}
                           className={"form-control"}
                           onChange={onCredentialsChange}
                    />
                </div>

                <button type={"submit"} className={"btn btn-primary btn-lg"}>Create</button>

            </form>


        </>

    )

}

export default withKeycloak(WorkoutForm)