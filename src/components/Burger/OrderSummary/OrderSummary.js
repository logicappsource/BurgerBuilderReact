import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

  const ingrdientsSummary = Object.keys(props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
        </li>);
      })

  return (
       <Aux>
        <h3> Your Order </h3>
          <p> Delicous Burger with the following ingredients</p>
        <ul>
            {ingrdientsSummary}
        </ul>
        <p> Continue to Checkout? </p>
      </Aux>
  )
};

export default orderSummary;
