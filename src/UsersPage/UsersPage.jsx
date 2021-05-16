import React from 'react';

import { performFetch } from '@/_services';
import { getDate } from '@/_helpers';
import AddUsersForm from './AddUsersForm';
import EditUsersForm from './EditUsersForm';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        performFetch("/user/get-all").then(users => this.setState({ users }));
    }

    deleteUser(userId) {
        performFetch("/user/delete", userId );
        window.location.reload();
    }

    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <h2>Users</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" width={"60%"}>Name</th>
                            <th scope="col">Moved In</th>
                            <th scope="col">Moved Out</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users && this.state.users.map(user => (
                        (<tr>
                            <td/>
                            <td>{user.firstName + " " + user.lastName}</td>
                            <td>{getDate(user.movedIn)}</td>
                            <td>{getDate(user.movedOut)}</td>
                            <td>
                                <button class="btn btn-primary" onClick={this.deleteUser.bind(this, user.id)}>Delete</button>
                            </td>
                        </tr>)
                    ))}
                    </tbody>
                </table>
                <h2>Add New User</h2>
                <AddUsersForm/>
                <h2 style={{'margin-top': '20px'}}>Edit User</h2>
                <EditUsersForm users={this.state.users}/>
            </div>
        );
    }
}

export { UsersPage };