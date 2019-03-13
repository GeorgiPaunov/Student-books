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
            isLoading: true,
            books: [],
            wantedBook: {},
            usersLists: [],
            wantedList: {},
            history: createBrowserHistory()
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.createBook = this.createBook.bind(this);
        this.getBookDetails = this.getBookDetails.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.createList = this.createList.bind(this);
        this.getListDetails = this.getListDetails.bind(this);
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
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("isAdmin", data.isAdmin);

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
        localStorage.clear();

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

    getBookDetails(id, path) {
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

    createList(list) {
        const token = localStorage.getItem("token");

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
        const token = localStorage.getItem("token");

        App.listService.getMyLists(token)
            .then((data) => {
                if (data.lists.length) {
                    this.setState({
                        usersLists: data.lists
                    });
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    getListDetails(id) {
        const token = localStorage.getItem("token");

        App.listService.getDetails(id, token)
            .then((data) => {
                if (data.list) {
                    this.setState({
                        wantedList: data.list
                    });

                    this.state.history.push(`/lists/details/${id}`);
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

    deleteList(id) {
        const token = localStorage.getItem("token");

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
            const token = localStorage.getItem("token");
            const data = { listId, bookId };

            App.listService.distributeBookToList(token, data)
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

    removeFromList(bookId) {
        const token = localStorage.getItem("token");
        const listId = this.state.wantedList._id;
        const data = { listId, bookId };

        App.listService.displaceBookFromList(token, data)
            .then((data) => {
                if (data.list) {
                    toast.success(data.message);
                    this.getListDetails(listId);
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
                                      lists={this.state.usersLists}
                                      books={this.state.books}
                                      username={this.state.username}
                                      isAdmin={this.state.isAdmin}
                                      getDetails={this.getBookDetails}
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
                            <Route path="/books" render={(props) => this.state.username
                                ? <BookPaths {...props}
                                      isAdmin={this.state.isAdmin}
                                      book={this.state.wantedBook}
                                      createBook={this.createBook}
                                      editBook={this.editBook}
                                      deleteBook={this.deleteBook}
                                  />
                                : <Redirect to="/"/>
                            }/>
                            <Route path="/lists" render={(props) => this.state.username
                                ? <ListPaths {...props}
                                      lists={this.state.usersLists}
                                      list={this.state.wantedList}
                                      createList={this.createList}
                                      deleteList={this.deleteList}
                                      getDetails={this.getListDetails}
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
        this.getAllBooks();
        this.getMyLists();
    }
}

export default App;