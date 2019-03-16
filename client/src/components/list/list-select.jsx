import React, { Component } from "react";

class ListSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.giveId = this.giveId.bind(this);
    }

    handleChange(evt) {
        this.setState({
            value: evt.target.value
        });
    }

    giveId() {
        return this.state.value;
    }

    render() {
        const { lists } = this.props;

        return (
                <select className="list-select" value={this.state.value} onChange={this.handleChange}>
                    <option value="" disabled>Choose a list</option>
                    {
                        lists.map(list => <option key={list._id} value={list._id}>{list.title}</option>)
                    }
                </select>
        );
    }

    componentWillUnmount() {
        console.log(this.state.value);
    }
}

export default ListSelect;