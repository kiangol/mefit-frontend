import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from '../pages/Login.jsx';
import NotFound from "../pages/NoMatch";
import AppContainer from "../hoc/AppContainer";
import Header from '../components/Header/Header';
import AllExercises from "../pages/AllExercises";

const Routes = () => (
    <Router>
        {/*AuthProvider og AppContainer her?*/}

        <Header/>
        <AppContainer>
            <Switch>
                <Route exact path={"/"} component={Login} />
                <Route exact path={"/exercises"} component={AllExercises} />
                <Route path={"*"} component={NotFound} />
            </Switch>
        </AppContainer>
    </Router>
)

export default Routes;