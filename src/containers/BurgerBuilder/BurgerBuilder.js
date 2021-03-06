import React,{Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE={
  salad:0.3,
  bacon:0.8,
  meat:1.5,
  cheese:0.5
}

class BurgerBuilder extends Component{
  state={
    ingredients:null,
    totalPrice:4,
    purchasable:false,
    purchasing:false,
    loading:false,
    error:false
  }

  componentDidMount=() => {
    axios.get('https://react-burger-builder-2903.firebaseio.com/ingredients.json')
    .then((res) => this.setState({ingredients:res.data}))
    .catch((err) => this.setState({error:true}))
  }

  updatePurchasableHandler=(ingredients) => {
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
    this.updatePurchasableHandler(updatedIngredients);
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

    this.updatePurchasableHandler(updatedIngredients);

  }

  purchasingHandler=() => {
    this.setState({purchasing:true});
  }

  closeModalHandler=() => {
    this.setState({purchasing:false});
  }

  continueOrderHandler=() => {
    //alert("Continue Order!!");
    const queryParams=[];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+this.state.totalPrice)
    const queryString=queryParams.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search:'?'+queryString
    });
  }


  render(){
    const disabledInfo={...this.state.ingredients};
    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key] <= 0;
    }

    let burger=this.state.error?<p>Ingredients cant be loaded</p>:<Spinner />;
    let orderSummary=null;

    if(this.state.ingredients){
      burger=(
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchasingHandler}/>
        </Aux>
      )

      orderSummary= <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancelOrder={this.closeModalHandler}
          continueOrder={this.continueOrderHandler}/>
    }


      if(this.state.loading){
        orderSummary=<Spinner />
      }

    return(
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.closeModalHandler}>
              {orderSummary}
            </Modal>
            {burger}
        </Aux>

    )
  }
}

export default WithErrorHandler(BurgerBuilder,axios);
