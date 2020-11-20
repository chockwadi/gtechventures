import React from 'react';
import Home from '../Containers/Home'
import Login from '../Containers/Login'
import Signup from '../Containers/Signup'
import ChStation from '../Containers/ChStation'

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
                <Route exact path="/login" render={() => <Login />}/>
                <Route exact path="/signup" render={() => <Signup />}/>
                <Route path="/charging-station/:id" render={() => <ChStation />}/>
            </Switch>
        </Router>
    )
}