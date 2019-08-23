import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends React.Component {
  componentDidMount() {
      this.props.onTryAutoSignup();
  }
  state = {
    show: true
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated) {
      routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/orders" exact component={asyncOrders} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/" />
      </Switch>
      )
    }
    return (
      <div>
          <Layout>
            {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
