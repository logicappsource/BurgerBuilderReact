import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from'./containers/Checkout/Checkout';

class App extends React.Component {
  state = {
    show: true
  }

  render () {
    return (
      <div>
          <Layout>
            <BurgerBuilder />
            <Checkout />
          </Layout>
      </div>
    );
  }
}

export default App;
