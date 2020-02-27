import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css'

// NavLink append the class active to the element by default
// but css module use unique classname with hash to distinguish between components 
// so changing the defaukt active classname to css module one is needed
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
            onClick={props.clicked}>{props.children}</NavLink>
    </li>
);

export default navigationItem;