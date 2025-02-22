import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { LoginPage } from '@/LoginPage';
import { UsersPage } from '@/UsersPage';
import { CostsPage } from '@/CostsPage';
import { AccountingsPage } from '@/AccountingsPage';
import { BankPage } from '@/BankPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {currentUser.role === "ADMIN" &&
                                    <Link to="/users" className="nav-item nav-link">Users</Link>
                                }
                                <Link to="/costs" className="nav-item nav-link">Costs</Link>
                                <Link to="/accountings" className="nav-item nav-link">Accountings</Link>
                                <Link to="/bank" className="nav-item nav-link">Bank</Link>
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute exact path="/users" component={UsersPage} />
                                    <PrivateRoute exact path="/costs" component={CostsPage} />
                                    <PrivateRoute exact path="/accountings" component={AccountingsPage} />
                                    <PrivateRoute exact path="/bank" component={BankPage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 