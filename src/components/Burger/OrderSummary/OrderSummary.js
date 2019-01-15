import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary=(props) => {
  const listIngredients=Object.keys(props.ingredients)
    .map(igkey => (
      <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span> : {props.ingredients[igkey]}
      </li>
    ))

  return (
    <Aux>
        <p> A delicious burger have the following ingredients:</p>
        <ul>
            {listIngredients}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={props.continueOrder} btnType="Success">CONTINUE</Button>
        <Button clicked={props.cancelOrder} btnType="Danger">CANCEL</Button>
    </Aux>
  )
}

export default orderSummary;
