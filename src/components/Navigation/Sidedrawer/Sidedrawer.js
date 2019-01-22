import React from 'react';

import classes from './Sidedrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sidedrawer=(props) => {
  return(
      <div className={classes.Sidedrawer}>
          <Logo />
          <nav>
              <NavigationItems />
          </nav>

      </div>
  )
}

export default sidedrawer;
