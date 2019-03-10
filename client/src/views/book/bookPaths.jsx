import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Create from "./create/create";
import BookDetails from "./details/book-details";
import Edit from "./edit/edit";

const BookPaths = (props) => {
    const { path } = props.match;
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const { editBook } = props;

    return (
        <Switch>
            <Route path={`${path}/details/:id`} render={(props) => <BookDetails {...props}/>}/>
            <Route path={`${path}/create`} render={() => props.isAdmin
                ? <Create {...props} createBook={props.createBook}/>
                : <Redirect to="/"/>
            }/>
            <Route path={`${path}/edit/:id`} render={(props) => isAdmin 
                ? <Edit {...props} editBook={editBook}/>
                : <Redirect to="/"/>
            }/>
        </Switch>
    );
};

export default BookPaths;