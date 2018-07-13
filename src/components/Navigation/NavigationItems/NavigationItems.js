import React from 'react'
import style from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={style.NavigationItems}>
            <NavigationItem link="/" exact >Burguer Builder</NavigationItem>
            <NavigationItem link="/orders" >Orders</NavigationItem>
            <NavigationItem link="/auth" >Authenticate</NavigationItem>
        </ul>
    );
}

export default navigationItems;