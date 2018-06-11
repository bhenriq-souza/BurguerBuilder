import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavigationItem.css';

const navigationItem = (props) => {
    return (
      <li className={style.NavigationItem}>
        <NavLink 
          to={props.link}
          exact={props.exact}
          activeClassName={style.active}>{props.children}
        </NavLink>
      </li>
    );
}

export default navigationItem;