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
            <div className="book-image">
                <img src={book.imageUrl} alt="book"/>
            </div>
            <div className="book-details">
                <div className="detail-row"><h2>Title</h2><h4>{book.title}</h4></div>
                <div className="detail-row"><h2>grade</h2><h4>{book.grade}</h4></div>
                <div className="detail-row"><h2>Author</h2><h4>{book.author}</h4></div>
                <div className="detail-row"><h2>Subject</h2><h4>{book.subject}</h4></div>
                <div className="detail-row"><h2>year</h2><h4>{book.year}</h4></div>
                <div className="detail-row"><h2>publisher</h2><h4>{book.publisher}</h4></div>
                <div className="detail-row"><h2>Price</h2><h4>{book.price.toFixed(2)} lv.</h4></div>
            </div>
            <div className="book-description">
                <div className="description-header"><h2>Description</h2></div>
                {book.description}
            </div>
        </div>
    );
};

export default BookDetails;