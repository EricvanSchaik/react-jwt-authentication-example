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
            clubs: {},
            authUser: JSON.parse(localStorage.getItem('currentUser'))
        };
        this.refreshCosts = this.refreshCosts.bind(this);
    }
    
    componentDidMount() {
        performFetch('/costs/get-all').then(costs => this.setState({ costs }));
        performFetch('/user/get-all').then(users => this.setState({ users }));
        performFetch('/user/current').then(currentUsers => this.setState({ currentUsers }));
        performFetch('/club/current').then(clubs => this.setState({ clubs }));
    }

    refreshCosts() {
        performFetch('/costs/get-all').then(costs => this.setState({ costs }));
    }

    deleteCost(costId) {
        performFetch("/costs/deleteCost", costId );
        window.location.reload();
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
                        {this.state.authUser.role === "ADMIN" &&
                            <th scope="col"></th>
                        }
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
                            {this.state.authUser.role === "ADMIN" &&
                                <td>
                                    <button class="btn btn-primary" onClick={this.deleteCost.bind(this, cost.id)}>Delete</button>
                                </td>
                            }
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