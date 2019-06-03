import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggler';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className={classes.Logo}>
      <Logo/>
    </div>
      <nav className={classes.DesktopOnly}>
          <NavigationItems />
      </nav>
  </header>
);

export default toolbar;
