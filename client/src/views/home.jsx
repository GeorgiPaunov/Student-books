import React from "react";
import "./home.css";

import Book from "../components/book/book";

const Home = (props) => {
    const books = props.books
        .sort((a, b) => a.grade - b.grade || a.subject.localeCompare(b.subject) || a.publisher.localeCompare(b.publisher));

    return (
        <div className="home">
            <h1>All Student Books</h1>
            {
                books.length
                    ?
                    <ul className="books">
                        {
                            books.map(book => <Book key={book._id}
                                username={props.username}
                                isAdmin={props.isAdmin}
                                {...book}
                            />)
                        }
                    </ul>
                    :
                    <h3>There are currently no Student Books</h3>
            }
        </div>
    );
};

export default Home;