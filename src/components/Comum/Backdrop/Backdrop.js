import React from 'react';
import style from './Backdrop.css';

const backdrop = (props) => {
    return (
        props.show ? <div className={style.Backdrop} onClick={props.closed}></div> : null
    );
};

export default backdrop;