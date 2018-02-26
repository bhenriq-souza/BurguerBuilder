import React from 'react';
import Aux from '../../hoc/Aux'
import style from '../Layout/Layout.css';

const layout = (props) => {
    return(
        <Aux>
            <div>
                Toolbar, SideDrawer, BackDrop
            </div>
            <main className={style.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default layout;