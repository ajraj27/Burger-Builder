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

  toggleSideDrawerHandler=() => {
    this.setState((prevState) => {
      return {showSideDrawer:!prevState.showSideDrawer}
    });
  }

  render(){
    return (
      <Aux>
          <Toolbar toggleDrawer={this.toggleSideDrawerHandler}/>
          <Sidedrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler}/>
          <main className={classes.Content}>
              {this.props.children}
          </main>
      </Aux>
    )
  }
}

export default Layout;
