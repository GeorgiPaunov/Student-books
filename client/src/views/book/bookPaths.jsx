import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Create from "./create/create";
import BookDetails from "./details/book-details";
import Edit from "./edit/edit";
import Delete from "./delete/delete";

const BookPaths = (properties) => {
    const { path } = properties.match;
    //const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    //const { editBook } = props;

    return (
        <Switch>
            <Route path={`${path}/details/:id`} render={(props) => <BookDetails book={properties.book} {...props}/>}/>
            <Route path={`${path}/create`} render={(props) => properties.isAdmin
                ? <Create {...props} createBook={properties.createBook}/>
                : <Redirect to="/"/>
            }/>
            <Route path={`${path}/edit/:id`} render={(props) => properties.isAdmin
                ? <Edit {...props} book={properties.book} editBook={properties.editBook}/>
                : <Redirect to="/"/>
            }/>
            <Route path={`${path}/delete/:id`} render={(props) => properties.isAdmin
                ? <Delete {...props} book={properties.book} deleteBook={properties.deleteBook}/>
                : <Redirect to="/"/>
            }/>
        </Switch>
    );
};

export default BookPaths;