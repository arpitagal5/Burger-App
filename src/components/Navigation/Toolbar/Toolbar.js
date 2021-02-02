import React from 'react' ;
import classes from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToogle/DrawerToggle';


const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <DrawerToggle clicked = {props.sideDrawerToggle} />

        <div className={classes.Logo}>
        <Logo />
        </div>
        
        <nav className = {classes.DesktopOnly}>
        <NavigationItems />
        </nav>
       
    </header>

);


//<Logo  height="80%"/>

export default toolbar ;
