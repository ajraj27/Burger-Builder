import React from 'react';

import Aux from '../../../hoc/Aux';

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
        <p>Continue to Checkout?</p>

    </Aux>
  )
}

export default orderSummary;
