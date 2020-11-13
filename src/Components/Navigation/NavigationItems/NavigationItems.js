import React from 'react'

import classes from './NavigationItems.module.css'
import NavigatioItem from './NavigationItem/NavigationItem'

const navigationitems=()=>(
    <ul className={classes.NavigationItems}>
        <NavigatioItem link="/" active>Burger Builder</NavigatioItem>
        <NavigatioItem link="/">Checkout</NavigatioItem>
    </ul>

);

export default navigationitems;