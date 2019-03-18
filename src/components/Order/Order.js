import React from 'react';

import classes from './Order.css';

const Order=(props) => {
    const ingredients=[];
    for(let key in props.ingredients){
        ingredients.push({
            name:key,
            amount:props.ingredients[key]
        });   
    }

    const ingOutput=ingredients.map(ing => {
        return <span
            key={ing.name}
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                border:'1px solid #ccc',
                padding:'5px',
                margin:'0 5px'
            }}>
            {ing.name} ({ing.amount})
        </span>
    });
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong> USD</p>
        </div>
    )
}

export default Order;