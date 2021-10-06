import React, {useState} from "react";


const RegisterForm = () => {

    //Ha med adresse i denne?
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        firstName: "",
        lastName: ""
    })
    const [address, setAddress] = useState({
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        postalCode: "",
        city: "",
        country: ""
    })

    const onCredentialsChange = event => {
        setCredentials({
            ...credentials,
            [event.target.id]: event.target.value
        })
    }

    const onAddressChange = event => {
        setAddress({
            ...address,
            [event.target.id]: event.target.value
        })
    }

    return (
        <>
            <form className={"mt-3"}>
                <h1>Register a new user</h1>

                <div className={"mb-3"}>
                    <label htmlFor={"username"} className={"form-label"}>Username</label>
                    <input id={"username"}
                           type={"text"}
                           placeholder={"Enter username"}
                           className={"form-control"}
                           onChange={onCredentialsChange}
                    />
                </div>

                <div className={"mb-3"}>
                    <label htmlFor={"password"} className={"form-label"}>Password</label>
                    <input id={"password"}
                           type={"password"}
                           placeholder={"Enter password"}
                           className={"form-control"}
                           onChange={onCredentialsChange}
                    />
                </div>

                <div className={"mb-3"}>
                    <label htmlFor={"firstName"} className={"form-label"}>First name</label>
                    <input id={"firstName"}
                           type={"text"}
                           placeholder={"Enter first name"}
                           className={"form-control"}
                           onChange={onCredentialsChange}
                    />
                </div>

                <div className={"mb-3"}>
                    <label htmlFor={"lastName"} className={"form-label"}>Last Name</label>
                    <input id={"lastName"}
                           type={"text"}
                           placeholder={"Enter last name"}
                           className={"form-control"}
                           onChange={onCredentialsChange}
                    />
                </div>

                {/*
                    ADDRESS
                */}

                <div className={"mb-3"}>
                    <label htmlFor={"addressLine1"} className={"form-label"}>Address line 1</label>
                    <input id={"addressLine1"}
                           type={"text"}
                           placeholder={"Enter address line 1"}
                           className={"form-control"}
                           onChange={onAddressChange}
                    />
                </div>

                <div className={"mb-3"}>
                    <label htmlFor={"addressLine2"} className={"form-label"}>Address line 2</label>
                    <input id={"addressLine2"}
                           type={"text"}
                           placeholder={"Enter address line 2"}
                           className={"form-control"}
                           onChange={onAddressChange}
                    />
                </div>

                <div className={"mb-3"}>
                    <label htmlFor={"addressLine3"} className={"form-label"}>Address line 3</label>
                    <input id={"addressLine3"}
                           type={"text"}
                           placeholder={"Enter address line 3"}
                           className={"form-control"}
                           onChange={onAddressChange}
                    />
                </div>

                <div className={"mb-3"}>
                    <label htmlFor={"postalCode"} className={"form-label"}>Postal code</label>
                    <input id={"postalCode"}
                           type={"number"}
                           placeholder={"Enter postal code"}
                           className={"form-control"}
                           onChange={onAddressChange}
                    />
                </div>

                <div className={"mb-3"}>
                    <label htmlFor={"city"} className={"form-label"}>City</label>
                    <input id={"city"}
                           type={"text"}
                           placeholder={"Enter city"}
                           className={"form-control"}
                           onChange={onAddressChange}
                    />
                </div>

                <div className={"mb-3"}>
                    <label htmlFor={"country"} className={"form-label"}>Country</label>
                    <input id={"country"}
                           type={"text"}
                           placeholder={"Enter country"}
                           className={"form-control"}
                           onChange={onAddressChange}
                    />
                </div>

                <button type={"submit"} className={"btn btn-primary btn-lg"}>Register</button>
            </form>

        </>
    )
}

export default RegisterForm;