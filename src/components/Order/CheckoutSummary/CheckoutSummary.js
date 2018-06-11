import React from 'react';

import Burguer from '../../Burguer/Burguer';
import Button from '../../Comum/Button/Button';
import style from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={style.CheckoutSummary} >
            <h1>We hope it taste well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burguer ingredients={props.ingredients} />
            </div>
            <div>
                <Button btnType="Danger"
                        clicked={props.checkoutCancelled}
                >
                        CANCEL
                </Button>
                <Button btnType="Success"
                        clicked={props.checkoutContinued}
                >
                        CONTINUE
                </Button>
            </div>
        </div>
    );

}

export default checkoutSummary;