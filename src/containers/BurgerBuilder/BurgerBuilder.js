import React,{Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Burger/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    totalPrice:4,
    purchasable:false

  }

  updatePurchasable=(ingredients) => {
    const sum=Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      }).reduce((sum,el) => {
            return sum+el;
      },0)

      this.setState({purchasable:sum>0})
  }

    addIngredientHandler=(type) => {
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
    });
    this.updatePurchasable(updatedIngredients);
  }

  removeIngredientHandler=(type) => {
    const oldCount=this.state.ingredients[type];
    if(oldCount<=0)
        return;
    const updatedCount=oldCount-1;
    const updatedIngredients={
      ...this.state.ingredients
    }
    updatedIngredients[type]=updatedCount;

    const oldPrice=this.state.totalPrice;
    const updatedPrice=oldPrice-INGREDIENT_PRICE[type];

    this.setState({
      ingredients:updatedIngredients,
      totalPrice:updatedPrice
    });

    this.updatePurchasable(updatedIngredients);

  }

  render(){
    const disabledInfo={...this.state.ingredients};
    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key] <= 0;
    }

    return(
        <Aux>
            <Modal>
              <OrderSummary ingredients={this.state.ingredients}/>
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              addIngredient={this.addIngredientHandler}
              removeIngredient={this.removeIngredientHandler}
              disabled={disabledInfo}
              price={this.state.totalPrice}
              purchasable={this.state.purchasable}/>
        </Aux>

    )
  }
}

export default BurgerBuilder;
