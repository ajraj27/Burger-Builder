import React,{Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component{
  render(){
    return (
      <Aux>
          <Toolbar />
          <Sidedrawer />
          <main className={classes.Content}>
              {props.children}
          </main>
      </Aux>
    )
  }
}

export default Layout;
