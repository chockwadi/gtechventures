import React from 'react';
import Home from '../Containers/Home'
import Login from '../Containers/Login'
import Signup from '../Containers/Signup'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

export default function AppRuter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Home />}/>
                <Route path="/login" render={() => <Login />}/>
                <Route path="/signup" render={() => <Signup />}/>
            </Switch>
        </Router>
    )
}