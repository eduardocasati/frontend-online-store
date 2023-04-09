import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Checkout from './pages/Checkout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shoppingcart" component={ShoppingCart} />
        <Route exact path="/product-details/:id" component={ProductDetails} />
        <Route exact path="/checkout" component={Checkout} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
