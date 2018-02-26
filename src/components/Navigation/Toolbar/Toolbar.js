import React from 'react';

import style from './Toolbar.css';

const toolbar = (props) => {
    return(
        <header className={style.Toolbar}>
            <div>MENU</div>
            <div>LOGO</div>
            <nav>
                ...
            </nav>
        </header>
    );
};

export default toolbar;