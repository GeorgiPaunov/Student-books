import React from "react";

const ListItem = (props) => {
    const listId = props.match.params.id;

    return (
        <li>
            <div className="item">
                <div className="item-image">
                    <img src={props.imageUrl} alt="book"/>
                </div>
                <div className="item-table">
                    <table align="left">
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <td>{props.title}</td>
                            </tr>
                            <tr>
                                <th>Grade</th>
                                <td>{props.grade}</td>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <td>{props.author}</td>
                            </tr>
                            <tr>
                                <th>Publisher</th>
                                <td>{props.publisher}</td>
                            </tr>
                            <tr>
                                <th>Year</th>
                                <td>{props.year}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{props.price.toFixed(2)} lv.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="item-btn" id="delete" onClick={() => props.removeFromList(listId, props._id)}>Remove</button>
            </div>
            <hr/>
        </li>
    );
};

export default ListItem;