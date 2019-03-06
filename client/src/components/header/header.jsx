import React from "react";
import NavBar from "./navbar";

const Header = (props) => {
    return <NavBar username={props.username} isAdmin={props.isAdmin} logoutUser={props.logoutUser}/>
};

export default Header;