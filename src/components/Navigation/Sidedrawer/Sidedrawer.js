import React from 'react';

import classes from './Sidedrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidedrawer=(props) => {
  let attachedClassses=[classes.Sidedrawer,classes.Close];

  if(props.open){
    attachedClassses=[classes.Sidedrawer,classes.Open];
  }

  return(
      <Aux>
        <Backdrop show={props.open} clicked={props.close} />
        <div className={attachedClassses.join(' ')}>
        <div className={classes.Logo}>
            <Logo />
        </div>
            <nav>
                <NavigationItems />
            </nav>

        </div>
      </Aux>
  )
}

export default sidedrawer;
