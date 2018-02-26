import React from 'react';
import style from './Modal.css';

import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    let classes = [style.Modal];

    if (props.show)
        classes.push(style.ShowModal);
    else
        classes.push(style.HideModal);
    
    return(
        <Aux>
            <Backdrop show={props.show} closed={props.modalClosed} />
            <div className={classes.join(' ')} >
                {props.children}
            </div>
        </Aux>
    );
};

export default modal;