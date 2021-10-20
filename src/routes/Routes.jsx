import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from '../pages/Login.jsx';
import NotFound from "../pages/NoMatch";
import AppContainer from "../hoc/AppContainer";
import Header from '../components/Header/Header';
import Register from "../pages/Register";
import Exercises from "../pages/Exercises";
import Dashboard from "../pages/Dashboard";
import Programs from "../pages/Programs";
import Workouts from "../pages/Workouts";
import ProfilePage from "../pages/ProfilePage";
import Contributors from "../pages/Contributors";
import NewWorkout from "../pages/NewWorkout";
import Goals from "../pages/Goals";

// Might redirect "/" to "/login" and have "/" as dashboard.
const Routes = () => {



    return (
        <Router>
            {/*AuthProvider og AppContainer her?*/}

            <Header/>
            <AppContainer>
                <Switch>
                    <Route exact path={"/"} component={Login}/>
                    <Route exact path={"/register"} component={Register}/>
                    <Route exact path={"/exercises"} component={Exercises}/>
                    <Route exact path={"/dashboard"} component={Dashboard}/>
                    <Route exact path={"/goals"} component={Goals}/>
                    <Route exact path={"/programs"} component={Programs}/>
                    <Route exact path={"/workouts"} component={Workouts}/>
                    <Route exact path={"/workouts/create"} component={NewWorkout}/>
                    <Route exact path={"/profile"} component={ProfilePage}/>
                    <Route exact path={"/contributor"} component={Contributors}/>
                    <Route path={"*"} component={NotFound}/>
                </Switch>
            </AppContainer>

        </Router>
    )
}

export default Routes;