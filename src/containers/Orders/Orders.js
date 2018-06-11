import React, { Component } from 'react';

import AxiosOrders from '../../axios/axios.orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        this.getOrders();
    }
    
    getOrders = () => {
        AxiosOrders
            .get('/orders.json')
            .then(res => { 
                console.log(res);
                // this.setState({ ingredients: res.data });
            })
            .catch(error => {
                // this.setState({ error: true });
            });
    }

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default Orders;