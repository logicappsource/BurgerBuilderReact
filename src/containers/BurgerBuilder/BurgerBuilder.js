import React, {Component} from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.4,
    bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://burgerbuilder-e3885.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data });
        })
        .catch(err => {
          this.setState({
            error: true
          })
        });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
          .map(igKey=> {
              return ingredients[igKey];
          })
          .reduce((sum, el) => {
              return sum + el;
          }, 0);
        this.setState({purchaseable: sum > 0 });
  }

  addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
       ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDecuction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDecuction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
      const queryParams = [];
      for (let i in this.state.ingredients) {
          queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
      }
      queryParams.push('price=', this.state.totalPrice);
      const queryString = queryParams.join('&');
      this.props.history.push({
          pathname: '/checkout',
          search: '?' + queryString
      });
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.ingredients ? <p> Ingredients can´t be loaded! </p> :  <Spinner />

    if(this.state.ingredients) {
      burger = (
        <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disableInfo}
              pruchaseable={this.state.purchaseable}
              price={this.state.totalPrice}
              orderd={this.purchaseHandler} />
        </Aux>
      );

      orderSummary =   <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchasedCancelled={this.purchaseCancelHandler}
        purchasedContinued={this.purchaseContinueHandler} />

      };

      if (this.state.loading) {
          orderSummary = <Spinner />
      }

    return (
      <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
      </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
