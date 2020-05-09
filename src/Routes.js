import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Search from './pages/Search'
import Politicas from './pages/Politicas'
import Intro from './pages/Intro'
import {getToken} from './services/auth'
function Routes() {
    return (
        <HashRouter  >
            <Switch >
                <Route component={Intro} path="/intro" />
                {/* <Route component={Login} path="/login" /> */}
                <Route component={Politicas} path="/politicas" />
                <Route component={Search} path="/search" />
                <Route path="/" exact component={Intro} />
            </Switch>
        </HashRouter>
    )
}


// function  PrivateRoute({ component: Component, ...rest }){
//     return <Route {...rest} render={  (props) =>  getToken()? ( <Component {...props} />) :(<Redirect to='/' />)} />
// }

export default Routes;