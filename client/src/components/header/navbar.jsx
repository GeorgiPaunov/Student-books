import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = (props) => {
    return (
        <header>
            <Link to="/">Home</Link>
            <div className="header-right">
                {
                    props.username
                        ?
                        (<span>
                            {
                                props.isAdmin
                                    ?
                                    (<span>
                                        <Link to="/books/create">Create book</Link>
                                     </span>)
                                    : null
                            }
                            <Link to="/lists/myLists">{props.username}'s lists</Link>
                            <Link to="/lists/create">Create list</Link>
                            <Link to="#" onClick={props.logoutUser}>Logout</Link>
                        </span>)
                        :
                        (<span>
                            <Link to="/users/register">Register</Link>
                            <Link to="/users/login">Login</Link>
                        </span>)
                }
            </div>
        </header>
    );
};

export default NavBar;