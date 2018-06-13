import React, { Component } from 'react';

import AxiosOrders from '../../axios/axios.orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.getOrders();
    }
    
    getOrders = () => {
        AxiosOrders
            .get('/orders.json')
            .then(res => {
                const arrayOrders = [];
                for(let key in res.data) {
                    arrayOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: arrayOrders });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                  <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />  
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, AxiosOrders);