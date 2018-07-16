import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BurguerBuilder from '../src/containers/BurguerBulder/BurguerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Authentication/Athentication';
import Logout from './containers/Authentication/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    render() {
        return (
            <div>
            <Layout>
                <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/auth" component={Auth} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurguerBuilder} />
                </Switch>
            </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
