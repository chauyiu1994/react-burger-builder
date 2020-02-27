import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigatioinItem';

// passing boolean variable 
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem 
            link="/" 
            exact 
            clicked={props.clicked}>Burger Builder</NavigationItem>
        {props.isAuthenticated 
            ? <NavigationItem link="/orders" clicked={props.clicked}>Orders</NavigationItem> 
            : null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth" clicked={props.clicked}>Authenticate</NavigationItem>
            : <NavigationItem link="/logout" clicked={props.clicked}>Logout</NavigationItem>}
    </ul>
);

export default navigationItems;