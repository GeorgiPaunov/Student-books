import React, { Component } from 'react';
import './login.css';

class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: "",
            password: ""
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
        this.props.loginUser(this.state);
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleForm}>
                    <h1>Login</h1>

                    <label htmlFor={"username"}>Username</label>
                    <input
                        required
                        type={"text"}
                        id={"username"}
                        value={this.state.email}
                        onChange={this.handleChange}
                    />

                    <label htmlFor={"password"}>Password</label>
                    <input
                        required
                        type={"password"}
                        id={"password"}
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <button type={"submit"}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
