import React from 'react';

import style from './Toolbar.css';

import Logo from '../../Logo/Logo';

const toolbar = (props) => {
    return(
        <header className={style.Toolbar}>
            <div>MENU</div>
            <Logo />
            <nav>
                ...
            </nav>
        </header>
    );
};

export default toolbar;