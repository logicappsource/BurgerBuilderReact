import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

  componentWillUdpdate() {
    console.log('Order sumamry wil update')
  }

  render() {

    const ingrdientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
          return (
            <li key={igKey}>
              <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
          </li>);
        })

    return (
      <Aux>
         <h3> Your Order </h3>
           <p> Delicous Burger with the following ingredients</p>
         <ul>
             {ingrdientsSummary}
         </ul>
         <p><strong>Total Price: {this.props.price.toFixed(2)} </strong> </p>
         <p> Continue to Checkout?</p>
           <Button btnType="Danger" clicked={this.props.purchasedCancelled}>Cancell</Button>
           <Button btnType="Success" clicked={this.props.purchasedContinued}>Continue</Button>
     </Aux>
   );
  }
}


export default OrderSummary;
