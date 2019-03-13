import React from "react";
import ListItem from "../../../components/list/list-item";
import "./list-details.css";

const ListDetails = (props) => {
    const { list } = props;

    return (
        <div className="list">
            <h1>{list.title}</h1>
            {
                list.studentBooks.length
                    ? <ul className="books">
                        {
                            list.studentBooks.sort((a, b) => a.subject.localeCompare(b.subject) || a.grade - b.grade)
                                .map(book => <ListItem key={book._id} {...book} removeFromList={props.removeFromList}/>)
                        }
                      </ul>
                    : <h3>There are currently no student books in this list</h3>
            }
        </div>
    );
};

export default ListDetails;