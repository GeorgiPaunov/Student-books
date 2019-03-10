import React, { Component } from "react";
import { toast } from "react-toastify";
import BookService from "../../../services/book-service";
import "./book-details.css";

class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {},
            isLoading: true
        };
    }

    static service = new BookService();

    render() {
        if (this.state.isLoading) {
            return <h2>Loading...</h2>
        }

        if(!this.state.book.title) {
            return <h3>There is no such book!</h3>
        }

        return (
            <div className="content">
                <img src={this.state.book.imageUrl} alt="book"/>
                <h1>{this.state.book.title} {this.state.book.grade} grade</h1>
                <h4>Author: {this.state.book.author}</h4>
                <h3>Subject: {this.state.book.subject}</h3>
                <span>{this.state.book.description}</span>
                <h4>{this.state.book.publisher} {this.state.book.year}</h4>
                <h2>Price: {this.state.book.price.toFixed(2)} lv.</h2>
            </div>
        );
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const token = localStorage.getItem("token");

        BookDetails.service.getDetails(id, token)
            .then((data) => {
                if (data.book) {
                    this.setState({
                        book: data.book,
                        isLoading: false
                    });
                } else {
                    this.props.history.push("/");
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                this.props.history.push("/");
                toast.error(error);
            });
    }
}

export default BookDetails;