import React from 'react';
import style from './Logo.css';
import burguerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
    return(
        <div className={style.Logo}>
            <img src={burguerLogo} alt="BurguerBuilder" />
        </div>
    );
};

export default logo;