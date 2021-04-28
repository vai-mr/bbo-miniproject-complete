import React, { useEffect  } from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import Search from './Search';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Register from "./Register";


function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('USER >>>', authUser);

      if (authUser) {
        //the user just logged in or the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,

        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,

        })

      }
    })
  }, [])

  //read the public key of the stripe account
  const stripePromise = loadStripe('pk_test_51Id8NDSG8qXTFbmpqvizSy0w8yNm9xWwRbyX8U7Ji3rjWiXDUVa9v2Nx3ppbVNn6tosscHsybZbGj0bXNei9rbt500KeN9hnaP');
  
  
  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/payment">
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>  
            <Footer />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/search">
            <Header hideDiv/>
            <Search />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
