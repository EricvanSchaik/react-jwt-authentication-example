import React from 'react';

import { performFetch } from '@/_services';


class MutationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: null,
            userId: null,
            label: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        performFetch('/bank/add-mutation', this.state);
    }

    handleChange(event) {
        const { name, value } = event.target;
        
        this.setState({
            [name] : value
        });
    }

    render() {
        return (
            <div className="container" style={{marginBottom: '20px'}}>
                <h2>Add Mutations</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group" key="amount">
                        <label htmlFor="amount">Amount</label>
                        <input className="form-control" id="amount" type="number" name="amount" min="0" step=".01" onChange={this.handleChange} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userId">User</label>
                        <select className="form-control" id="userId" name="userId" onChange={this.handleChange}>
                            { this.props.users &&
                                this.props.users.map(user => (
                                    <option value={user.id}>{user.firstName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group" key="label">
                        <label htmlFor="label">Label</label>
                        <input className="form-control" id="label" type="text" value={this.state.label} name="label" onChange={this.handleChange} required></input>
                    </div>
                    <button className="btn btn-primary" type="submit" key="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default MutationForm;