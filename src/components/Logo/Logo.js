import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/Images/logo.burger.png' ;


// const logo = (props) => (
//     <div className = {classes.Logo} style = {{ height : props.height}}>
//         <img src = {burgerLogo} alt ="My Burger" />
//     </div>
// );

// export default logo ;
const logo = () => (
    <div className = {classes.Logo}>
        <img src = {burgerLogo} alt ="My Burger" />
    </div>
);

export default logo ;