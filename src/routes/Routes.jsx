import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from '../pages/Login.jsx';
import NotFound from "../pages/NoMatch";

const Routes = () => (
    <Router>
        {/*AuthProvider og Container her?*/}
        <Switch>
            <Route exact path={"/"}>
                <Login />
            </Route>
            <Route path={"*"} component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes;