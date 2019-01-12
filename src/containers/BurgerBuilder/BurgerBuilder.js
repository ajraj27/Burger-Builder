import React,{Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE={
  salad:0.3,
  bacon:0.8,
  meat:1.5,
  cheese:0.5
}

class BurgerBuilder extends Component{
  state={
    ingredients:{
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },
    totalPrice:4

  }

    addIngredient=(type) => {
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount+1;
    const updatedIngredients={
      ...this.state.ingredients
    }
    updatedIngredients[type]=updatedCount;

    const oldPrice=this.state.totalPrice;
    const updatedPrice=oldPrice+INGREDIENT_PRICE[type];

    this.setState({
      ingredients:updatedIngredients,
      totalPrice:updatedPrice
    })
  }

  render(){
    return(
        <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls addIngredient={this.addIngredient}/>
        </Aux>

    )
  }
}

export default BurgerBuilder;
