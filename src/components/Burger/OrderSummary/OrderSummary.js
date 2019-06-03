import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
          <p><strong>Total Price: {props.price.toFixed(2)} </strong> </p>
          <p> Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchasedCancelled}>Cancell</Button>
            <Button btnType="Success" clicked={props.purchasedContinued}>Continue</Button>
      </Aux>
  )
};

export default orderSummary;
