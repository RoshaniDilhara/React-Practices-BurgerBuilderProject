import React from 'react';
import { checkPropTypes } from 'prop-types';

import classes from './DrawerToggle.module.css'

const drawerToggle =(props)=>(
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;