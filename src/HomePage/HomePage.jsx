import React from 'react';

import { authenticationService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue
        };
    }

    render() {
        return (
            <div>
                <h1>Gegroet feuten! Hierbij de zeer ambitieuze flatwebsite</h1>
            </div>
        );
    }
}

export { HomePage };