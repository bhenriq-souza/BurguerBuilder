import React, { Component } from 'react';
import style from './Modal.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] componentWillUpdate');
    }
    render() {
        let classes = [style.Modal];

        if (this.props.show)
            classes.push(style.ShowModal);
        else
            classes.push(style.HideModal);

        return(
            <Aux>
                <Backdrop show={this.props.show} closed={this.props.modalClosed} />
                <div className={classes.join(' ')} >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;