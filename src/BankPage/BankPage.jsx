import React from 'react';

import { performFetch } from '@/_services';
import { getDate } from '@/_helpers';

class BankPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mutations: null,
      users: null,
      saldi: null
    };
  }

  componentDidMount() {
    performFetch("/bank/get-all").then(mutations => this.setState({ mutations }));
    performFetch("/user/get-all").then(users => this.setState({ users }));
    performFetch("/bank/current-saldi").then(saldi => this.setState({ saldi }));
  }

  render() {
    const { mutations, users, saldi } = this.state;
    return (
      <div className="container">
        <h2>Current Saldi</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Current Saldo</th>
            </tr>
          </thead>
          <tbody>
            { mutations && users && saldi && this.state.users.map(user => (
              <tr>
                <td scope="row">{user.firstName}</td>
                <td scope="row">{Math.round(saldi[user.id] * 100) / 100}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Mutations</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Label</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { mutations && users && this.state.mutations.map(mutation => (
              <tr>
                <td>{this.state.users.find(u => u.id === mutation.userId).firstName}</td>
                <td>{mutation.amount}</td>
                <td>{mutation.label}</td>
                <td>{getDate(mutation.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export { BankPage }