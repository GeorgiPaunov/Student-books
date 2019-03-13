import React from "react";
import "./my-lists.css";
import ListTable from "../../../components/list/list-table";

const MyLists = (props) => {
    return (
        <div className={"table"}>
            <h2>Your lists</h2>
            <ListTable {...props}/>
        </div>
    );
};

export default MyLists;