import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/Comum/Modal/Modal';

const withErrorHandle = (WrappedComponnet, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use( req => {
                this.setState({ error: null });
                return req;
            });
            this.responsetInterceptor = axios.interceptors.response.use( 
                res => res, 
                error => { this.setState({ error: error }) }
            );
        }

        /**
         * For this, when the component unmount, we eject the interceptors, because we
         * need to prevent memory leaks.
         */

        componentWillUnmount () {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed ={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponnet {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandle;