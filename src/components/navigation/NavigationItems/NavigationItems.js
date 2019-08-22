import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
     <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger Builder </NavigationItem>
        <NavigationItem link="/orders">Orders </NavigationItem>
        <NavigationItem link="/auth">Auth </NavigationItem>
     </ul>
);

export default navigationItems;
