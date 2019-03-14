import React from "react";
import { toast } from "react-toastify";
import "../form.css";

const Delete = (props) => {
    const id = props.match.params.id;
    const book = props.books.filter(b => b._id.toString() === id).pop();

    if (!book) {
        props.history.push("/");
        toast.error("Such book doesn't exist!");
        return null;
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.deleteBook(id);
    }

    return (
        <div className="create">
            <h1>Delete Student Book</h1>
            <form onSubmit={(evt) => handleSubmit(evt)}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={book.title}
                    disabled
                />

                <label htmlFor="grade">Grade</label>
                <input
                    type="number"
                    id="grade"
                    value={book.grade}
                    disabled
                />

                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    value={book.subject}
                    disabled
                />

                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    value={book.author}
                    disabled
                />

                <label htmlFor="publisher">Publisher</label>
                <input
                    type="text"
                    id="publisher"
                    value={book.publisher}
                    disabled
                />

                <label htmlFor="year">Year</label>
                <input
                    type="number"
                    id="year"
                    value={book.year}
                    disabled
                />

                <label htmlFor="imageUrl">Image</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={book.imageUrl}
                    disabled
                />

                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    step="0.1"
                    id="price"
                    value={book.price}
                    disabled
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={book.description}
                    disabled
                />

                <button type="submit">Delete</button>
            </form>
        </div>
    );
};

export default Delete;