import React from 'react';
import style from './Button.css';

const button = (props) => {
    return(
        <button
            className={[style.Button, style[props.btnType]].join(' ')}
            disabled={props.disabled}
            onClick={props.clicked}>
                {props.children}
        </button>
    );
};

export default button;