import React from "react";
import { toast } from "react-toastify";
import "./book-details.css";

const BookDetails = (props) => {
    const id = props.match.params.id;
    const book = props.books.filter(b => b._id.toString() === id).pop();

    if (!book) {
        props.history.push("/");
        toast.error("Such book doesn't exist!");
        return null;
    }

    return (
        <div className="content">
            <img src={book.imageUrl} alt="book"/>
            <h1>{book.title} {book.grade} grade</h1>
            <h4>Author: {book.author}</h4>
            <h3>Subject: {book.subject}</h3>
            <span>{book.description}</span>
            <h4>{book.publisher} {book.year}</h4>
            <h2>Price: {book.price.toFixed(2)} lv.</h2>
        </div>
    );
};

export default BookDetails;