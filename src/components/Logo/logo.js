import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './logo.css';

const logo = (props) => (
  <div className={classes.Logo}><img src={burgerLogo} alt="BurgerBuilder" style={{height: props.heiight}} /></div>
);

export default logo;
