import React from "react"

const Login = () => (
    <>
        <form className={"mt-3"}>
            <h1>Login to MeFit</h1>
            <p>Welcome to MeFit, the place to get fit!</p>

            <div className="mb-3">
                <label htmlFor="username" className={"form-label"}>Username</label>
                <input id={"username"} type={"text"} placeholder={"Enter your username"} className={"form-control"} />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className={"form-label"}>Password</label>
                <input id={"password"} type={"password"} placeholder={"Enter your password"} className={"form-control"} />
            </div>

            <button type={"submit"} className={"btn btn-primary btn-lg"}>Login</button>
        </form>
    </>
);

export default Login;