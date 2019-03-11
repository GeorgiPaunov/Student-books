import React from "react";
import { toast } from "react-toastify";
import "./book-details.css";

const BookDetails = (props) => {
    if (!props.book.title) {
        props.history.push("/");
        toast.error("Such book doesn't exist!");
        return null;
    }

    return (
        <div className="content">
            <img src={props.book.imageUrl} alt="book"/>
            <h1>{props.book.title} {props.book.grade} grade</h1>
            <h4>Author: {props.book.author}</h4>
            <h3>Subject: {props.book.subject}</h3>
            <span>{props.book.description}</span>
            <h4>{props.book.publisher} {props.book.year}</h4>
            <h2>Price: {props.book.price.toFixed(2)} lv.</h2>
        </div>
    );
};

export default BookDetails;