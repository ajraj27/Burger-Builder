import React,{Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component{
  state={
    showSideDrawer:true
  }

  closeSideDrawerHandler=() => {
    this.setState({showSideDrawer:false});
  }

  render(){
    return (
      <Aux>
          <Toolbar />
          <Sidedrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler}/>
          <main className={classes.Content}>
              {this.props.children}
          </main>
      </Aux>
    )
  }
}

export default Layout;
