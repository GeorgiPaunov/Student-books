import React from "react";
import ListItem from "../../../components/list/list-item";
import "./list-details.css";
import {toast} from "react-toastify";

const ListDetails = (props) => {
    const id = props.match.params.id;
    const list = props.lists.filter(l => l._id.toString() === id).pop();

    if (!list) {
        props.history.push("/");
        toast.error("Such list doesn't exist!");
        return null;
    }

    return (
        <div className="list">
            <h1>{list.title}</h1>
            {
                list.studentBooks.length
                    ? <ul className="books">
                        {
                            list.studentBooks.sort((a, b) => a.subject.localeCompare(b.subject) || a.grade - b.grade)
                                .map(book => <ListItem key={book._id} {...book} {...props}/>)
                        }
                      </ul>
                    : <h3>There are currently no student books in this list</h3>
            }
        </div>
    );
};

export default ListDetails;