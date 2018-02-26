import React from 'react';
import style from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={style.BuildControl}>
            <div className={style.Label}>{props.label}</div>
            <button 
                className={style.Less} 
                onClick={props.removed}
                disabled={props.disabled}
            >-</button>
            <button className={style.More} onClick={props.added}>+</button>
        </div>
    );
};

export default buildControl;    