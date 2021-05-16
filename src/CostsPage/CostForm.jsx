import React from 'react';
import { performFetch } from '@/_services';

class CostForm extends React.Component {

    constructor(props) {
        super(props);

        this.emptyCost = {
            payerId: null,
            description: null,
            amount: null,
            durationMonths: null,
            timestamp: new Date(),
            payedFor: null,
            authUser: JSON.parse(localStorage.getItem('currentUser'))
        };

        this.state = this.emptyCost;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        
        this.setState({
            [name] : value
        });
    }

    handleClub(event) {
        const { value } = event.target;

        if (value  === "Everyone") {
            this.setState({
                payedFor: this.props.users.map(user => user.id)
            })
        }
        else {
            this.setState({
                payedFor: this.props.clubs[value]
            })
        }
    }

    handleSubmit() {
        if (this.state.authUser.role === "ADMIN") {
            performFetch('/costs/addCostAsAdmin', this.state);
        }
        else {
            performFetch('/costs/addCost', this.state);
        }
    }

    componentDidUpdate() {
        if (this.state.payerId === null && this.props.users[0].id !== undefined) {
            this.setState({
                payerId: this.props.users[1].id,
                payedFor: this.props.users.map(user => user.id)
            })
        }
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="payerId">What is your name?</label>
                        <select className="form-control" id="payerId" name="payerId" onChange={this.handleChange}>
                            {
                                this.props.users.filter(u => u.firstName !== "Flatkas").map(user => (
                                    <option value={user.id}>{user.firstName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group" key="description">
                        <label htmlFor="description">What did you buy?</label>
                        <input className="form-control" id="description" type="text" value={this.state.description} name="description" onChange={this.handleChange} required></input>
                    </div>
                    <div className="form-group" key="amount">
                        <label htmlFor="amount">For how much did you buy it?</label>
                        <input className="form-control" id="amount" type="number" name="amount" min="0" step=".01" onChange={this.handleChange} required></input>
                    </div>
                    <div className="form-group" key="payedFor">
                        <label htmlFor="payedFor">For who did you buy it?</label>
                        <select className="form-control" id="payedFor" name="payedFor" onChange={this.handleClub}>
                            <option value="Everyone">Everyone</option>
                            {
                                Object.keys(this.props.clubs).map(clubName => (
                                    <option value={clubName} key={clubName}>{clubName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button className="btn btn-primary" type="submit" key="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default CostForm;