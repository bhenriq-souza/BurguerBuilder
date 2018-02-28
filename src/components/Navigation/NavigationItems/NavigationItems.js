import React from 'react'
import style from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={style.NavigationItems}>
            <NavigationItem link="/" active={true} >Burguer Builder</NavigationItem>
            <NavigationItem link="/" active={false} >Checkout</NavigationItem>
        </ul>
    );
}

export default navigationItems;