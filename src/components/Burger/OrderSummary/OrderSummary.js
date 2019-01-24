import React,{Component} from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate(){
    console.log('[componentWillUpdate] orderSummary');
  }

  render(){
    const listIngredients=Object.keys(this.props.ingredients)
      .map(igkey => (
        <li key={igkey}>
              <span style={{textTransform:'capitalize'}}>{igkey}</span> : {this.props.ingredients[igkey]}
        </li>
      ))

    return (
      <Aux>
          <p> A delicious burger have the following ingredients:</p>
          <ul>
              {listIngredients}
          </ul>
          <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
          <p>Continue to Checkout?</p>
          <Button clicked={this.props.continueOrder} btnType="Success">CONTINUE</Button>
          <Button clicked={this.props.cancelOrder} btnType="Danger">CANCEL</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
