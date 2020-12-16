import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Product from './pages/products/product'
import AddProduct from './pages/products/addProduct'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Demo from './pages/demo'

function App() {
  return (
    <Router>
    <Fragment>
      <section>
        <Switch>
          <Route exact path="/" component={Demo}></Route>
          <Route exact path="/product" component={Product}></Route>
          <Route exact path="/add" component={AddProduct}></Route>
          <Route exact path="/cart" component={Cart}></Route>
          <Route exact path="/checkout" component={Checkout}></Route>
          <Route path= "*" component={ () => "404 NOT FOUND" } /> {/*you will always have 404 Error rendered on the screen, if URL in the browser does not match any route */}
        </Switch>
      </section>
    </Fragment>
  </Router>
  )
}

export default App;
