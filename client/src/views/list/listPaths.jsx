import React from "react";
import { Route, Switch } from "react-router-dom";
import Create from "./create/create";
import MyLists from "./all/my-lists";
import ListDetails from "./details/list-details";

const ListPaths = (properties) => {
    const { path } = properties.match;

    return (
        <Switch>
            <Route path={`${path}/create`} render={() => <Create createList={properties.createList}/>}/>
            <Route path={`${path}/myLists`} render={(props) => <MyLists
                    {...props}
                    lists={properties.lists}
                    deleteList={properties.deleteList}
                />
            }/>
            <Route path={`${path}/details/:id`} render={(props) => <ListDetails
                    {...props}
                    lists={properties.lists}
                    removeFromList={properties.removeFromList}
                />
            }/>
        </Switch>
    );

};

export default ListPaths;