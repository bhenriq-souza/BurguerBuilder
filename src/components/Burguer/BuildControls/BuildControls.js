import React from 'react';
import style from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={style.BuildControls}>
            <div><p>Current price: <strong>$ {props.price.toFixed(2)}</strong></p></div>
            {
                controls.map((ctrl) => {
                    return <BuildControl 
                                label={ctrl.label} 
                                key={ctrl.label}
                                added={ () => props.ingredientAdded(ctrl.type) } 
                                removed={ () => props.ingredientRemoved(ctrl.type) } 
                                disabled={props.disabled[ctrl.type]} />;
                })
            }
            <button 
                className={style.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{ props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    );
};

export default buildControls;