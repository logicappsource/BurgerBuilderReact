import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

orderHandler = (event) => {
  event.preventDefault();
      this.setState({ loading: true });
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: 'Patrick',
          address: {
            street: 'sdsdsdsd',
            zipCode: '23131',
            country: 'denmark'
          },
          email: 'test@test.com'
        },
        deliveryMethod: 'fastest'
      }

      axios.post( '/orders.json', order)
        .then(response => {
          this.setState({ loading: false})
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({ loading: false })
          console.log(error)
        })
}

  render() {
    let form = (
      <form>
          <Input inputtype="input" type="text" name="name" placeholder="your Name" />
          <Input inputtype="input" type="text" name="email" placeholder="your Email"/>
          <Input inputtype="input" type="text" name="Street" placeholder="your Street" />
          <Input inputtype="input" type="text" name="postalcode" placeholder="your Postal Code" />
          <Button btntype="Success" clicked={this.orderHandler}>ORDER </Button>
      </form>
    );

    if(this.state.loading) {
      form = <Spinner />;
    }

    return(
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
  }
}

export default ContactData;
