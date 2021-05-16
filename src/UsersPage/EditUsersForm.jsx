import React from 'react';

import { performFetch } from '@/_services';


class EditUsersForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            movedIn: null,
            movedOut: null
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

    componentDidUpdate() {
        if (this.state.userId === null && this.props.users !== null) {
            this.setState({
                userId: this.props.users[0].id
            })
        }
    }

    handleSubmit() {
        performFetch('/user/edit', this.state);
    }

    render() {
        return (
            <div className="container">
                {this.props.users && 
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userId">Which user do you want to edit?</label>
                            <select className="form-control" id="userId" name="userId" onChange={this.handleChange}>
                                {
                                    this.props.users.map(user => (
                                        <option value={user.id}>{user.firstName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group" key="firstName">
                            <label htmlFor="description">First Name</label>
                            <input className="form-control" id="firstName" type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange}></input>
                        </div>
                        <div className="form-group" key="lastName">
                            <label htmlFor="description">Last Name</label>
                            <input className="form-control" id="lastName" type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange}></input>
                        </div>
                        <div className="form-group" key="movedIn">
                            <label htmlFor="description">Moved In</label>
                            <input className="form-control" id="movedIn" type="date" value={this.state.movedIn} name="movedIn" onChange={this.handleChange}></input>
                        </div>
                        <div className="form-group" key="movedOut">
                            <label htmlFor="description">Moved Out</label>
                            <input className="form-control" id="movedOut" type="date" value={this.state.movedOut} name="movedOut" onChange={this.handleChange}></input>
                        </div>
                        <button className="btn btn-primary" type="submit" key="submit">Submit</button>
                    </form>
                }
            </div>
        )
    }
}

export default EditUsersForm;