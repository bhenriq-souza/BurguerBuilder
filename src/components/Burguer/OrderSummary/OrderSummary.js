import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../Comum/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(key => {
        return (
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
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
            <p><strong>Total price: $ {props.price.toFixed(2)} </strong></p>
            <p>Continue to checkout?</p>
            <Button btnType={'Danger'} clicked={props.cancel}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.continue} >CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;