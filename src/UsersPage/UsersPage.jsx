import React from 'react';

import { performFetch } from '@/_services';
import { getDate } from '@/_helpers';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        performFetch("/user/").then(users => this.setState({ users }));
    }

    render() {
        const { users } = this.state;
        return (
            <div className="container">
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
                            <th scope="row"></th>
                            <td>{user.firstName + " " + user.lastName}</td>
                            <td>{getDate(user.movedIn)}</td>
                            <td>{getDate(user.movedOut)}</td>
                        </tr>)
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export { UsersPage };