import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  componentDidMount(){
    console.log('contactdata')
  }

  render() {
    console.log('ddd')
    return(
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form>
                <input type="text" name="name" placeholder="your Name" />
                <input type="text" name="email" placeholder="your Email"/>
                <input type="text" name="Street" placeholder="your Street" />
                <input type="text" name="postalcode" placeholder="your Postal Code" />
                <Button btnType="Success">ORDER </Button>
            </form>
        </div>
    );
  }
}

export default ContactData;
