import React, { Component, Fragment } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import createBrowserHistory from "history/createBrowserHistory";

import UserService from "./services/user-service";
import BookService from "./services/book-service";
import ListService from "./services/list-service";

import Header from "./components/header/header";
import Home from "./views/home/home";
import UserPaths from "./views/user/userPaths";
import BookPaths from "./views/book/bookPaths";
import ListPaths from "./views/list/listPaths";
import notFound from "./views/not-found";

import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            isAdmin: false,
            booksLoading: true,
            listsLoading: true,
            books: [],
            usersLists: [],
            history: createBrowserHistory()
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.createBook = this.createBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.createList = this.createList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.addToList = this.addToList.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
    }

    static userService = new UserService();
    static bookService = new BookService();
    static listService = new ListService();

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
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("username", data.username);
                    sessionStorage.setItem("isAdmin", data.isAdmin);

                    toast.success(data.message);

                    this.setState({
                        username: data.username,
                        isAdmin: data.isAdmin
                    });

                    this.getMyLists();
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    logoutUser() {
        sessionStorage.clear();

        toast.success(`Goodbye, ${this.state.username}!`);

        this.setState({
            username: null,
            isAdmin: false,
            usersLists: []
        });
    }

    getAllBooks() {
        App.bookService.getAllBooks()
            .then((data) => {
                this.setState({
                    books: data.books,
                    booksLoading: false
                });
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    createBook(book) {
        const token = sessionStorage.getItem("token");

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

    editBook(book, id) {
        const token = sessionStorage.getItem("token");

        App.bookService.edit(id, token, book)
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
        const token = sessionStorage.getItem("token");

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

    createList(list) {
        const token = sessionStorage.getItem("token");

        App.listService.create(token, list)
            .then((data) => {
                if (data.list) {
                    toast.success(data.message);

                    this.setState((prevState) => ({
                        usersLists: [...prevState.usersLists, data.list]
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

    getMyLists() {
        const token = sessionStorage.getItem("token");

        App.listService.getMyLists(token)
            .then((data) => {
                if (data.lists.length) {
                    this.setState({
                        usersLists: data.lists,
                        listsLoading: false
                    });
                } else if (this.state.usersLists.length > 0) {
                    this.setState({
                        usersLists: [],
                        listsLoading: false
                    });
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    deleteList(id) {
        const token = sessionStorage.getItem("token");

        App.listService.delete(id, token)
            .then((data) => {
                if (data.list) {
                    toast.success(data.message);
                    this.getMyLists();
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    addToList(listId, bookId) {
        if (!listId) {
            toast.error("Select a valid list!");
        } else {
            const token = sessionStorage.getItem("token");
            const data = { listId, bookId };

            App.listService.addBookToList(token, data)
                .then((data) => {
                    if (data.list) {
                        toast.success(data.message);
                        this.getMyLists();
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    }

    removeFromList(listId, bookId) {
        const token = sessionStorage.getItem("token");
        const data = { listId, bookId };

        App.listService.removeBookFromList(token, data)
            .then((data) => {
                if (data.list) {
                    toast.success(data.message);
                    this.getMyLists();
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    componentWillMount() {
        const token = sessionStorage.getItem("token");

        if (token) {
            this.setState({
                username: sessionStorage.getItem("username"),
                isAdmin: JSON.parse(sessionStorage.getItem("isAdmin"))
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
                            <Route path="/" exact render={(props) => this.state.booksLoading
                                ? <h2>Loading...</h2>
                                : <Home {...props}
                                      lists={this.state.usersLists}
                                      books={this.state.books}
                                      username={this.state.username}
                                      isAdmin={this.state.isAdmin}
                                      addToList={this.addToList}
                                  />
                            }/>
                            <Route path="/users" render={(props) => this.state.username
                                ? <Redirect to="/"/>
                                : <UserPaths {...props}
                                      registerUser={this.registerUser}
                                      loginUser={this.loginUser}
                                  />
                            }/>
                            <Route path="/books" render={(props) => this.state.booksLoading
                                ? <h2>Loading...</h2>
                                : this.state.username
                                ? <BookPaths {...props}
                                      isAdmin={this.state.isAdmin}
                                      books={this.state.books}
                                      createBook={this.createBook}
                                      editBook={this.editBook}
                                      deleteBook={this.deleteBook}
                                  />
                                : <Redirect to="/"/>
                            }/>
                            <Route path="/lists" render={(props) => this.state.listsLoading
                                ? <h2>Loading...</h2>
                                : this.state.username
                                ? <ListPaths {...props}
                                      lists={this.state.usersLists}
                                      createList={this.createList}
                                      deleteList={this.deleteList}
                                      removeFromList={this.removeFromList}
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
        this.getMyLists();
        this.getAllBooks();
    }
}

export default App;