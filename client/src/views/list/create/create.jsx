import React, { Component } from "react";

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    handleChange(evt) {
        this.setState({
            title: evt.target.value
        });
    }

    handleForm(evt) {
        evt.preventDefault();
        this.props.createList(this.state);
    }

    render() {
        return (
            <div className="create">
                <h1>Create List</h1>
                <form onSubmit={this.handleForm}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                    <button type={"submit"}>Create</button>
                </form>
            </div>
        );
    }
}

export default Create;