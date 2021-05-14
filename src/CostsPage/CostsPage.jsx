import React from 'react';
import { getDate } from '@/_helpers';
import { performFetch } from '@/_services';
import CostForm from './CostForm';

class CostsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            costs: [0],
            activePage: 0,
            users: [0],
            currentUsers: [0],
            clubs: {}
        };
        this.refreshCosts = this.refreshCosts.bind(this);
    }
    
    componentDidMount() {
        performFetch('/costs/').then(costs => this.setState({ costs }));
        performFetch('/user/').then(users => this.setState({ users }));
        performFetch('/user/current').then(currentUsers => this.setState({ currentUsers }));
        performFetch('/club/current').then(clubs => this.setState({ clubs }));
    }

    refreshCosts() {
        performFetch('/costs/').then(costs => this.setState({ costs }));
        console.log(this.state.costs);
    }

    render() {
        return (
            <div className="container">
                <CostForm users={this.state.currentUsers} clubs={this.state.clubs} refreshCosts = {this.refreshCosts}/>
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Payed by</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.costs.map(cost => (
                        (<tr>
                            <th scope="row"></th>
                            <td>{findUserName(this.state.users, cost.payerId)}</td>
                            <td>{cost.description}</td>
                            <td>{cost.amount}</td>
                            <td width="15%">{getDate(cost.timestamp)}</td>
                        </tr>)
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

function findUserName(users, payerId) {
    const user = users.find(user => user.id === payerId);
    if (user) {
        return user.firstName;
    }
    else {
        return "";
    }
}

export { CostsPage }