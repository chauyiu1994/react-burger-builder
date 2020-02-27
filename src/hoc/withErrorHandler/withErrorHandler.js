import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// usage withErrorHandler(WrappedComponent)
const withErrorHandler = (WrappedComponent, axios) => {
    // = java anonymous class
    return class extends Component {

        state = {
            error: null
        };

        // should set up intercept before children mounted
        constructor() {

            super();

            // keep reference of interceptors but no need to store in state because it is not related to component rendering
            this.reqInterceptor = axios.interceptors.request.use((req, error) => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {

            // clean up interceptors to prevent memory leak
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }



        errorConfirmHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;