import React from 'react';

import { performFetch } from '@/_services';

class AccountingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accountings: null,
            users: null
        };
    }

    componentDidMount() {
        performFetch("/accounting/get-all").then(accountings => this.setState({ accountings }));
        performFetch("/user/get-all").then(users => this.setState({ users }));
    }

    render() {
        const { accountings, users } = this.state;
        return (
            <div className="container">
                { accountings && users && 
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Payed By</th>
                                <th>Payed For</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.accountings[0].users.map(user => (
                                <tr>
                                    <td>{this.state.users.find(u => u.id === user).firstName}</td>
                                    <td>{this.state.accountings[0].payedBy[user]}</td>
                                    <td>{this.state.accountings[0].payedFor[user]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                <ul className="list-group">
                    { accountings && this.state.accountings.map(accounting => (
                        <li className="list-group-item">Accounting of {accounting.month} - {accounting.year}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export { AccountingsPage };