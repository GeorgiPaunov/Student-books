import React, { Component, Fragment } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import createBrowserHistory from "history/createBrowserHistory";

import UserService from "./services/user-service";
import BookService from "./services/book-service";

import Header from "./components/header/header";
import Home from "./views/home/home";
import UserPaths from "./views/user/userPaths";
import BookPaths from "./views/book/bookPaths";
import notFound from "./views/not-found";

import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            isAdmin: false,
            books: [],
            isLoading: true,
            wantedBook: {},
            history: createBrowserHistory()
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.createBook = this.createBook.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    static userService = new UserService();
    static bookService = new BookService();

    registerUser(user) {
        App.userService.register(user)
            .then((data) => {
                if (data.username) {
                    toast.success(data.message);
                    this.loginUser(user);
                } else {
                    if (data.errors) {
                        Object.values(data.errors).forEach(error => toast.error(error));
                    } else {
                        toast.error(data.message);
                    }
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    loginUser(user) {
        App.userService.login(user)
            .then((data) => {
                if (data.username) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("isAdmin", data.isAdmin);

                    toast.success(data.message);

                    this.setState({
                        username: data.username,
                        isAdmin: data.isAdmin
                    });
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    logoutUser() {
        localStorage.clear();

        toast.success("Logged out successfully");

        this.setState({
            username: null,
            isAdmin: false
        });
    }

    getAllBooks() {
        App.bookService.getAllBooks()
            .then((data) => {
                this.setState({
                    books: data.books,
                    isLoading: false
                });
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    createBook(book) {
        const token = localStorage.getItem("token");

        App.bookService.create(book, token)
            .then((data) => {
                if (data.book) {
                    toast.success(data.message);

                    this.setState((prevState) => ({
                        books: [...prevState.books, data.book]
                    }));

                    this.state.history.push("/");
                } else {
                    if (data.errors) {
                        Object.values(data.errors).forEach(error => toast.error(error));
                    } else {
                        toast.error(data.message);
                    }
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    getDetails(id, path) {
        const token = localStorage.getItem("token");

        App.bookService.getDetails(id, token)
            .then((data) => {
                if (data.book) {
                    this.setState({
                        wantedBook: data.book
                    });

                    this.state.history.push(`/books/${path}/${id}`);
                } else {
                    this.state.history.push("/");
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                this.state.history.push("/");
                toast.error(error);
            });
    }

    editBook(book, id) {
        const token = localStorage.getItem("token");

        App.bookService.edit(id, book, token)
            .then((data) => {
                if (data.book) {
                    toast.success(data.message);
                    this.state.history.push("/");
                    this.getAllBooks();
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    deleteBook(id) {
        const token = localStorage.getItem("token");

        App.bookService.delete(id, token)
            .then((data) => {
                if (data.book) {
                    toast.success(data.message);
                    this.state.history.push("/");
                    this.getAllBooks();
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    componentWillMount() {
        const token = localStorage.getItem("token");

        if (token) {
            this.setState({
                username: localStorage.getItem("username"),
                isAdmin: JSON.parse(localStorage.getItem("isAdmin"))
            });
        } else {
            this.setState({
                username: null,
                isAdmin: false
            });
        }
    }

    render() {
        return (
            <div className="App">
                <ToastContainer autoClose={2000} closeButton={false} closeOnClick={true} hideProgressBar={true} pauseOnHover={true}/>
                <Router history={this.state.history}>
                    <Fragment>
                        <Header username={this.state.username} isAdmin={this.state.isAdmin} logoutUser={this.logoutUser}/>
                        <Switch>
                            <Route path="/" exact render={(props) => this.state.isLoading
                                ? <h2>Loading...</h2>
                                : <Home {...props}
                                        books={this.state.books}
                                        username={this.state.username}
                                        isAdmin={this.state.isAdmin}
                                        getDetails={this.getDetails}
                                  />
                            }/>
                            <Route path="/users" render={(props) => this.state.username
                                ? <Redirect to="/"/>
                                : <UserPaths {...props} registerUser={this.registerUser} loginUser={this.loginUser}/>
                            }/>
                            <Route path="/books" render={(props) => this.state.username
                                ? <BookPaths {...props}
                                             isAdmin={this.state.isAdmin}
                                             createBook={this.createBook}
                                             book={this.state.wantedBook}
                                             editBook={this.editBook}
                                             deleteBook={this.deleteBook}
                                  />
                                : <Redirect to="/"/>
                            }/>
                            <Route component={notFound}/>
                        </Switch>
                    </Fragment>
                </Router>
            </div>
        );
    }

    componentDidMount() {
        this.getAllBooks();
    }
}

export default App;
