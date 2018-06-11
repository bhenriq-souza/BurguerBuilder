import React from 'react';

import style from './Order.css';

const order = (props) => {
    return(
        <div className={style.Order} >
            <p>Ingredients: Salad (1)</p>
            <p>Price: <strong>USD 5.50</strong></p>
        </div>
    );
};

export default order;