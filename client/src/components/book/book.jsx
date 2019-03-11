import React from "react";

const Book = (props) => {
    function getDetails(id) {
        props.getDetails(id, "details");
    }

    function getEdit(id) {
        props.getDetails(id, "edit");
    }

    function getDelete(id) {
        props.getDetails(id, "delete");
    }

    return (
        <li className="book">
            <h2>{props.title}</h2>
            <h2>{props.grade} grade</h2>
            <img src={props.imageUrl} alt=""/>
            {
                props.username
                    ? <span>
                        <div className="inner">
                            <button onClick={() => getDetails(props._id)}>Details</button>
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
                            <button onClick={() => getEdit(props._id)}>Edit</button>
                        </div>
                        <div className="inner">
                            <button onClick={() => getDelete(props._id)}>Delete</button>
                        </div>
                      </span>
                    : null
            }
        </li>
    );
};

export default Book;