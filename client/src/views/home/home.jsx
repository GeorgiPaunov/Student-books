import React from "react";
import "./home.css";

import Book from "../../components/book/book";
import ListSelect from "../../components/list/list-select";

const Home = (props) => {
    const listRef = React.createRef();

    function getId() {
        return listRef.current.giveId();
    }

    function giveDistributionInfo(bookId) {
        const listId = getId();

        props.addToList(listId, bookId);
    }

    const books = props.books
        .sort((a, b) => (
            a.grade - b.grade ||
            a.subject.localeCompare(b.subject) ||
            a.publisher.localeCompare(b.publisher
        )));

    return (
        <div className="home">
            {
                props.username
                    ? <ListSelect lists={props.lists} ref={listRef}/>
                    : null
            }
            <h1>All Student Books</h1>
            {
                books.length
                    ?
                    <ul className="books">
                        {
                            books.map(book => <Book key={book._id}
                                                    {...props}
                                                    username={props.username}
                                                    isAdmin={props.isAdmin}
                                                    getDetails={props.getDetails}
                                                    giveDistributionInfo={giveDistributionInfo}
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