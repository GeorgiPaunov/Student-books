import React, { Component, Fragment } from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserService from "./services/user-service";
import BookService from "./services/book-service";

import Header from "./components/header/header";
import Home from "./views/home";
import UserPaths from "./views/user/userPaths";
import notFound from "./views/not-found";

import "./App.css";
import BookPaths from "./views/book/bookPaths";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            isAdmin: false,
            books: [],
            isLoading: true
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.createBook = this.createBook.bind(this);
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

    createBook(book) {
        const token = localStorage.getItem("token");

        App.bookService.create(book, token)
            .then((data) => {
                if (data.book) {
                    toast.success(data.message);

                    this.setState((prevState) => ({
                        books: [...prevState.books, data.book]
                    }));
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
                <BrowserRouter>
                    <Fragment>
                        <Header username={this.state.username} isAdmin={this.state.isAdmin} logoutUser={this.logoutUser}/>
                        <Switch>
                            <Route path="/" exact render={(props) => this.state.isLoading
                                ? <h2>Loading...</h2>
                                : <Home {...props} books={this.state.books} username={this.state.username} isAdmin={this.state.isAdmin}/>
                            }/>
                            <Route path="/users" render={(props) => this.state.username
                                ? <Redirect to="/"/>
                                : <UserPaths {...props} registerUser={this.registerUser} loginUser={this.loginUser}/>
                            }/>
                            <Route path="/books" render={(props) => this.state.username
                                ? <BookPaths {...props} isAdmin={this.state.isAdmin} createBook={this.createBook}/>
                                : <Redirect to="/"/>
                            }/>
                            <Route component={notFound}/>
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }

    componentDidMount() {
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
}

export default App;
