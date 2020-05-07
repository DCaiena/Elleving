import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Search from './pages/Search'
import {getToken} from './services/auth'
function Routes() {
    return (
        <HashRouter  >
            <Switch >
                <Route component={Login} path="/login" />
                <PrivateRoute component={Search} path="/search" />
                <Route path="/" exact component={Login} />
            </Switch>
        </HashRouter>
    )
}


function  PrivateRoute({ component: Component, ...rest }){
    return <Route {...rest} render={  (props) =>  getToken()? ( <Component {...props} />) :(<Redirect to='/' />)} />
}

export default Routes;