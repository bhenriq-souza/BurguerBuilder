import React from 'react';

import style from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return(
        <header className={style.Toolbar}>
            <div>MENU</div>
            <div className={style.Logo}>
                <Logo />
            </div>
            <nav className={style.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;