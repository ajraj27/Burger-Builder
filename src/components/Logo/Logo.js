import React from 'react';

import BurgerLogo from '../../assets/images/133 burger-logo.png';
import classes from './Logo.css';

const logo=(props) => (
  <div className={classes.Logo}>
        <img src={BurgerLogo} alt="MyBurger" />
  </div>
)

export default logo;
