import React from 'react' ;
import classes from './SideDrawer.module.css';
// import Toolbar from '../Toolbar/Toolbar';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../../UI/Backdrop/Backdrop';



const sideDrawer = (props) => {
    let attatchedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attatchedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attatchedClasses.join(' ')}>
           <div className= {classes.Logo} >
           <Logo  />
           </div>
            <nav>
            <NavigationItems />
            </nav>

        </div>

        </Aux>
        
    );
  

}
// //<Logo height="11%" />

export default sideDrawer ;