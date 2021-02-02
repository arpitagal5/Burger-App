import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad' , type : 'salad' },
    {label:'Bacon' , type : 'bacon' },
    {label:'Cheese' , type : 'cheese' },
    {label:'Meat' , type : 'meat' }
]

const buildControls = ( props) => {
    return(
        <div className = {classes.BuildControls}>
            <p>Bureger Cost: <strong>${props.price.toFixed(2)}</strong></p>
            { controls.map(ctrl => (
                <BuildControl
                added = {() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                key={ctrl.label} label={ctrl.label} type={ctrl.type}
                disabled = {props.disabled[ctrl.type]} />
            ))}
            <button className={classes.OrderButton} disabled = {!props.purchasable}
            onClick = {props.ordered}>ORDER NOW</button>

        </div>
    );
}

export default buildControls ;