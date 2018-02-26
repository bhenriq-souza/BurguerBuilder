import React from 'react';

import style from '../Layout/Layout.css';

import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar';


const layout = (props) => {
    return(
        <Aux>
            <Toolbar />
            <main className={style.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default layout;