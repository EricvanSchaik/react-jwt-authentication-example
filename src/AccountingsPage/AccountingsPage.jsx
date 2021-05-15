import React from 'react';

import { performFetch } from '@/_services';

class AccountingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accountings: null,
            users: null,
            currentAccounting: 0
        };
    }

    componentDidMount() {
        performFetch("/accounting/get-all").then(accountings => this.setState({ accountings }));
        performFetch("/user/get-all").then(users => this.setState({ users }));
    }

    selectAccounting(index) {
        this.setState({ currentAccounting: index })
    }

    render() {
        const { accountings, users, currentAccounting } = this.state;
        return (
            <div className="container">
                { accountings && <h2>Accounting of {this.state.accountings[currentAccounting].month} - {this.state.accountings[currentAccounting].year}</h2>}
                { accountings && users && 
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Payed By</th>
                                <th>Payed For</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.accountings[currentAccounting].users.map(user => {
                                const payedBy = this.state.accountings[currentAccounting].payedBy[user];
                                const payedFor = this.state.accountings[currentAccounting].payedFor[user];
                                return (
                                <tr>
                                    <td>{this.state.users.find(u => u.id === user).firstName}</td>
                                    <td>{payedBy}</td>
                                    <td>{payedFor}</td>
                                    <td>{Math.round((payedBy - payedFor)*100) / 100}</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
                <ul className="list-group">
                    { accountings && this.state.accountings.map(accounting => (
                        <li className="list-group-item" onClick={this.selectAccounting.bind(this, accountings.findIndex(a => a === accounting))}>Accounting of {accounting.month} - {accounting.year}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export { AccountingsPage };