import React, { Component } from 'react';

import AxiosOrders from '../../../axios/axios.orders';
import Button from '../../../components/Comum/Button/Button';
import Spinner from '../../../components/Comum/Spinner/Spinner';
import style from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Bruno Souza',
                address: {
                    street: 'Rua teste 1',
                    zipCode: '12345678',
                    country: 'Brazil'
                },
                email: 'teste@teste.com',
                deliveryMethod: 'fastest'
            }
        }
        
        // Firebase's routes must finde the .json extension.
        AxiosOrders
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className={style.Input} type="text" name="name" placeholder="Your Name" />
                <input className={style.Input} type="email" name="emai" placeholder="Your Mail" />
                <input className={style.Input} type="text" name="street" placeholder="Your Street" />
                <input className={style.Input} type="text" name="postal" placeholder="Your Postal Code" />
                <Button 
                    btnType="Success"
                    clicked={this.orderHandler} >
                ORDER
                </Button>               
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={style.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;