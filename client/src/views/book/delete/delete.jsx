import React from "react";
import { toast } from "react-toastify";
import "../form.css";

const Delete = (props) => {
    if (!props.book.title) {
        props.history.push("/");
        toast.error("Such book doesn't exist!");
        return null;
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const id = props.match.params.id;

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
                    value={props.book.title}
                    disabled
                />

                <label htmlFor="grade">Grade</label>
                <input
                    type="number"
                    id="grade"
                    value={props.book.grade}
                    disabled
                />

                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    value={props.book.subject}
                    disabled
                />

                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    value={props.book.author}
                    disabled
                />

                <label htmlFor="publisher">Publisher</label>
                <input
                    type="text"
                    id="publisher"
                    value={props.book.publisher}
                    disabled
                />

                <label htmlFor="year">Year</label>
                <input
                    type="number"
                    id="year"
                    value={props.book.year}
                    disabled
                />

                <label htmlFor="imageUrl">Image</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={props.book.imageUrl}
                    disabled
                />

                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    value={props.book.price}
                    disabled
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={props.book.description}
                    disabled
                />

                <button type="submit">Delete</button>
            </form>
        </div>
    );
};

export default Delete;