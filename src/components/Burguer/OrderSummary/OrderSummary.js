import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../Comum/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummay] componentWillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                </li>
            );
        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burguer with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: $ {this.props.price.toFixed(2)} </strong></p>
                <p>Continue to checkout?</p>
                <Button btnType={'Danger'} clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType={'Success'} clicked={this.props.continue} >CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;