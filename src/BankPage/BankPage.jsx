import React from 'react';

import { performFetch } from '@/_services';
import { getDate } from '@/_helpers';
import "./Bankpage.css";
import MutationForm from './MutationForm';

class BankPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mutations: null,
      users: null,
      saldi: null,
      authUser: JSON.parse(localStorage.getItem('currentUser')),
    };
  }

  componentDidMount() {
    performFetch("/bank/get-all").then(mutations => this.setState({ mutations }));
    performFetch("/user/get-all").then(users => this.setState({ users }));
    performFetch("/bank/current-saldi").then(saldi => this.setState({ saldi }));
  }

  deleteMutation(mutationId) {
    performFetch("/bank/delete-mutation", mutationId );
    window.location.reload();
  }

  render() {
    const { mutations, users, saldi } = this.state;
    return (
      <div className="container">
        <h2>Current Saldi</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Current Saldo</th>
            </tr>
          </thead>
          <tbody> 
            { mutations && users && saldi && Object.keys(saldi).map(userId => (
              <tr>
                <td scope="row">{users.find(u => u.id == userId).firstName}</td>
                <td scope="row">{Math.round(saldi[userId] * 100) / 100}</td>
              </tr>
            ))}
          </tbody>
        </table>

        { this.state.authUser.role === "ADMIN" &&
          <MutationForm users={this.state.users}/>
        }

        <h2>Mutations</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Label</th>
              <th>Date</th>
              {this.state.authUser.role === "ADMIN" &&
                <th scope="col"></th>
              }
            </tr>
          </thead>
          <tbody>
            { mutations && users && mutations.map(mutation => (
              <tr>
                <td>{users.find(u => u.id === mutation.userId).firstName}</td>
                <td>{mutation.amount}</td>
                <td>{mutation.label}</td>
                <td>{getDate(mutation.timestamp)}</td>
                {this.state.authUser.role === "ADMIN" &&
                  <td>
                      <button class="btn btn-primary" onClick={this.deleteMutation.bind(this, mutation.id)}>Delete</button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export { BankPage }