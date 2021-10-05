import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from '../pages/Login.jsx';
import NotFound from "../pages/NoMatch";
import AppContainer from "../hoc/AppContainer";
import Header from '../components/Header';

const Routes = () => (
    <Router>
        {/*AuthProvider og Container her?*/}

        <Header/>

        <AppContainer>
            <Switch>

                <Route exact path={"/"}>
                    <Login/>
                </Route>
                <Route path={"*"} component={NotFound}/>

            </Switch>
        </AppContainer>
    </Router>
)

export default Routes;