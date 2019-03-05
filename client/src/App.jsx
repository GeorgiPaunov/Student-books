import React, { Component, Fragment } from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserService from "./services/user-service";

import Header from "./components/header";
import Home from "./views/home";
import User from "./views/user/user";
import notFound from "./views/not-found";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            isAdmin: false,
            books: []
        };

        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    static userService = new UserService();

    registerUser(user) {
        App.userService.register(user)
            .then((data) => {
                if (data.username) {
                    toast.success(data.message);
                    this.loginUser(user);
                } else {
                    if (data.errors) {
                        Object.values(data.errors).forEach(err => toast.error(err));
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

    componentWillMount() {
        const token = localStorage.getItem("token");

        if (token) {
            this.setState({
                username: localStorage.getItem("username"),
                isAdmin: !!localStorage.getItem("isAdmin")
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
                <ToastContainer autoClose={3000} closeButton={false} closeOnClick={true} hideProgressBar={true} pauseOnHover={true}/>
                <BrowserRouter>
                    <Fragment>
                        <Header username={this.state.username} isAdmin={this.state.isAdmin} logoutUser={this.logoutUser}/>
                        <Switch>
                            <Route path="/" exact render={(props) => <Home {...props}/>}/>
                            <Route path="/user" render={(props) => this.state.username
                                ? <Redirect to="/"/>
                                : <User {...props} registerUser={this.registerUser} loginUser={this.loginUser}/>}/>
                            <Route component={notFound}/>
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
