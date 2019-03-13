import React from "react";
import { Route, Switch } from "react-router-dom";
import Create from "./create/create";
import MyLists from "./all/my-lists";
import ListDetails from "./details/list-details";

const ListPaths = (props) => {
    const { path } = props.match;

    return (
        <Switch>
            <Route path={`${path}/create`} render={() => <Create createList={props.createList}/>}/>
            <Route path={`${path}/myLists`} render={() => <MyLists
                    lists={props.lists}
                    deleteList={props.deleteList}
                    getDetails={props.getDetails}
                />
            }/>
            <Route path={`${path}/details/:id`} render={() => <ListDetails
                    list={props.list}
                    removeFromList={props.removeFromList}
                />
            }/>
        </Switch>
    );

};

export default ListPaths;