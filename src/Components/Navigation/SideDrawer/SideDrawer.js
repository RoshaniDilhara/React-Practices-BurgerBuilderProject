import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'

const sideDrawer = (props)=>{

    let attachedClasses = [classes.SideDrawer,classes.Close]

    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open]
    }

    return(
        <Aux>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            {/* <Logo height="11%"/> */}
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;