import React from 'react'
import BuildControl from './BuildControl/BuildControl'
// import './BuildControls.modules.css'
import classes from './BuildControls.module.css';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
];

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => ( 
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.type}
                added = {() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button
        className={classes.OrderButton}
        onClick={props.ordered}
        disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;