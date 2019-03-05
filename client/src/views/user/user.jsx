import React from "react";
import { Route, Switch } from "react-router-dom";

import Register from "./register/register";
import Login from "./login/login";

const User = (props) => {
    const { path } = props.match;

    return (
        <Switch>
            <Route path={`${path}/register`} render={() => <Register registerUser={props.registerUser}/>}/>
            <Route path={`${path}/login`} render={() => <Login loginUser={props.loginUser}/>}/>
        </Switch>
    );
};

export default User;