import React from 'react' ;
import classes from './Order.module.css';
const order = (props) => {
    const ingredients = [];

    for( let ingredientName in props.ingredients){
        ingredients.push ({
            name : ingredientName ,
            amount : props.ingredients[ingredientName]
        })
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span style = {{
            textTransform : 'capitalize' ,
            margin: '0 10px' ,
            padding: '10px',
            display : 'inline-block',
            border:'1px solid #ccc'

        }}
        key = {ig.name}> {ig.name} ({ig.amount})</span>
    })
    console.log(ingredientOutput , +props.price);
    return(
        <div className = {classes.Order}>
        
            <p> Ingredients : {ingredientOutput}</p>
            <p>Price : <strong>USD {+props.price.toFixed(2)}</strong></p>
        </div>
    );
}
export default order;