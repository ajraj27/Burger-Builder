import React from 'react';

import BurgerIngredient from './Ingredient/Ingredient';
import classes from './Burger.css';

const burger=(props) => {
  let transformedIngredients=Object.keys(props.ingredients)
  .map(igkey => {
    return [...Array(props.ingredients[igkey])].map((_,i) => {
            return <BurgerIngredient key={igkey+i} type={igkey} />
    });
  }).reduce((arr,el) => {
      return arr.concat(el);
  },[]);

  if(transformedIngredients.length===0)
      transformedIngredients=<p>Start filling ingredients!!</p>

  //console.log(transformedIngredients);

  return (
        <div className={classes.Burger}>
          <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
        <BurgerIngredient type='bread-bottom'/>
        </div>
  )
}

export default burger;
