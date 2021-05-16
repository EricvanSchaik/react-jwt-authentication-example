import React from 'react';

class EditUsersForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            movedIn: null,
            movedOut: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        
        this.setState({
            [name] : value
        });
    }

    componentDidUpdate() {
        if (this.state.userId === null && this.props.users !== null) {
            this.setState({
                userId: this.props.users[0].id
            })
        }
    }

    render() {
        return (
            <div className="container">
                {this.props.users && 
                    <form>
                        <div className="form-group">
                            <label htmlFor="userId">Which user do you want to edit?</label>
                            <select className="form-control" id="userId" name="userId" onChange={this.handleChange}>
                                {
                                    this.props.users.map(user => (
                                        <option value={user.id}>{user.firstName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit" key="submit">Submit</button>
                    </form>
                }
            </div>
        )
    }
}

export default EditUsersForm;