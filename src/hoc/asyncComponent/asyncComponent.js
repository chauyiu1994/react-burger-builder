import React, { Component } from 'react';

// take function that return import() function as an argument
const asyncComponent = (importComponent) => {

    return class extends Component {

        state = {
            component: null
        };

        componentDidMount() {

            // after this component is rendered, render the wrapped component 
            importComponent()
                .then(cmp => {
                    this.setState( { component: cmp.default } );
                });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props}/> : null;
        }
    }
}

export default asyncComponent;