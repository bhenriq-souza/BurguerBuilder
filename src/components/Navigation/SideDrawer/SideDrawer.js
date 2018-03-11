import React from 'react';

import style from './SideDrawer.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../Comum/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const sideDrawer = (props) => {
    let attachedClasses = [style.SideDrawer];

    if(props.open)
        attachedClasses.push(style.Open);
    else
        attachedClasses.push(style.Close);
    
    return (
        <Aux>
            <Backdrop show={props.open} closed={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={style.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

/* Writing just "show" in a boolean prop, means you're setting the true to the props.
 * */

export default sideDrawer;