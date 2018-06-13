import React from 'react';

import style from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let ingredientsName in props.ingredients) {
        ingredients.push({ name: ingredientsName, amount: props.ingredients[ingredientsName] });
    }
    const ingredientsOutput = ingredients.map( ig => {
        return <span key={ig.name} className={style.Ingredients} > {ig.name} ( {ig.amount} ) </span>
    });
    return(
        <div className={style.Order} >
            <p>Ingredients: { ingredientsOutput }</p>
            <p>Price: <strong>USD { Number.parseFloat(props.price).toFixed(2) }</strong></p>
        </div>
    );
};

export default order;