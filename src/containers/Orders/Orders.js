import React, { Component } from 'react';
import { connect } from 'react-redux';

import AxiosOrders from '../../axios/axios.orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/Comum//Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onGetOrders(this.props.token);
    }
    
    render() {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = (
                this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))
            );
        }
        return <div> { orders } </div>;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };   
};

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: (token) => dispatch(actions.fetchOrders(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, AxiosOrders));