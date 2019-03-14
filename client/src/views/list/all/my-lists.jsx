import React from "react";
import ListTable from "../../../components/list/list-table";
import "./my-lists.css";

const MyLists = (props) => {
    if (!props.lists.length) {
        return <h2>You have no lists</h2>
    }

    return (
        <div className={"table"}>
            <h2>Your lists</h2>
            <ListTable {...props}/>
        </div>
    );
};

export default MyLists;