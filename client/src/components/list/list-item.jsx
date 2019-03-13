import React from "react";

const ListItem = (props) => {
    return (
        <li className="item">
            <img src={props.imageUrl} alt="book"/>
            <h1>{props.title} {props.grade} grade</h1>
            <h4>Author: {props.author}</h4>
            <h4>{props.publisher}</h4>
            <h4>{props.year}</h4>
            <h2>Price: {props.price.toFixed(2)} lv.</h2>
            <button onClick={() => props.removeFromList(props._id)}>Remove</button>
        </li>
    );
};

export default ListItem;