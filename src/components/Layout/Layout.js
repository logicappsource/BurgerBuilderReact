import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../navigation/Toolbar/Toolbar';

const Layout = (props) => (
  <Aux>
      <Toolbar /> 
    <main className={classes.Content}>
          {props.children}
    </main>
  </Aux>
);

export default Layout;
