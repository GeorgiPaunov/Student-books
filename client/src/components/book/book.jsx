import React from "react";

const Book = (props) => {
    return (
        <li className="book">
            <h2>{props.title} {props.grade} grade</h2>
            <img src={props.imageUrl} alt=""/>
            {
                props.username
                    ? <span>
                        <div className="inner">
                            <button>Details</button>
                        </div>
                        <div className="inner">
                            <button>Add</button>
                        </div>
                      </span>
                    : null
            }
            {
                props.isAdmin
                    ? <span>
                         <div className="inner">
                            <button>Edit</button>
                        </div>
                        <div className="inner">
                            <button>Delete</button>
                        </div>
                      </span>
                    : null
            }
        </li>
    );
};

export default Book;