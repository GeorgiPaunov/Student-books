import React, { Component } from 'react';
import { toast } from "react-toastify";
import '../form.css';

class Edit extends Component {
    constructor (props) {
        super(props);

        this.state = {
            title: this.props.book.title,
            grade: this.props.book.grade,
            subject: this.props.book.subject,
            author: this.props.book.author,
            publisher: this.props.book.publisher,
            year: this.props.book.year,
            description: this.props.book.description,
            imageUrl: this.props.book.imageUrl,
            price: this.props.book.price,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    handleChange(evt) {
        const {value, id} = evt.target;

        this.setState({
            [id]: value
        });
    }

    handleForm(evt) {
        evt.preventDefault();
        const id = this.props.match.params.id;

        this.props.editBook(this.state, id);
    }

    render() {
        if (!this.state.title) {
            this.props.history.push("/");
            toast.error("Such book doesn't exist!");
        }

        return (
            <div className="create">
                <h1>Edit Student Book</h1>
                <form onSubmit={this.handleForm}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="grade">Grade</label>
                    <input
                        type="number"
                        id="grade"
                        value={this.state.grade}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={this.state.subject}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={this.state.author}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="publisher">Publisher</label>
                    <input
                        type="text"
                        id="publisher"
                        value={this.state.publisher}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        id="year"
                        value={this.state.year}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="imageUrl">Image</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="description">Description</label>
                    <textarea id="description" onChange={this.handleChange} value={this.state.description}/>

                    <button type="submit">Edit</button>
                </form>
            </div>
        );
    }
}

export default Edit;