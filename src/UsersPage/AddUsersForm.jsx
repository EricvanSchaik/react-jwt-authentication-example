import React from 'react';

import { performFetch } from '@/_services';

class AddUsersForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            movedIn: new Date(),
            movedOut: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        
        this.setState({
            [name] : value
        });
    }

    handleSubmit() {
        performFetch('/user/create', this.state);
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group" key="firstName">
                        <label htmlFor="description">First Name</label>
                        <input className="form-control" id="firstName" type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange} required></input>
                    </div>
                    <div className="form-group" key="lastName">
                        <label htmlFor="description">Last Name</label>
                        <input className="form-control" id="lastName" type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange} required></input>
                    </div>
                    <div className="form-group" key="movedIn">
                        <label htmlFor="description">When has he/she moved in?</label>
                        <input className="form-control" id="movedIn" type="date" value={this.state.movedIn} name="movedIn" onChange={this.handleChange} required></input>
                    </div>
                    <div className="form-group" key="movedOut">
                        <label htmlFor="description">Has he/she already moved out? If so, when?</label>
                        <input className="form-control" id="movedOut" type="date" value={this.state.movedOut} name="movedOut" onChange={this.handleChange}></input>
                    </div>
                    <button className="btn btn-primary" type="submit" key="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddUsersForm;