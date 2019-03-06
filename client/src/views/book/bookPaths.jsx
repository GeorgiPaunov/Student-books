import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Create from "./create/create";

const BookPaths = (props) => {
    const { path } = props.match;

    return (
        <Switch>
            <Route path={`${path}/create`} render={() => props.isAdmin
                ? <Create createBook={props.createBook}/>
                : <Redirect to="/"/>
            }/>
        </Switch>
    );
};

export default BookPaths;