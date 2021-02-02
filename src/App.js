
import React, { Component } from 'react' ;
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import {Route , Switch} from 'react-router-dom';
import Orders from '../src/containers/Orders/Orders';
import Auth from '../src/containers/Auth/Auth';


class App extends Component{
  render(){
    return(
      <div>
       <Layout>
         <Switch>
         <Route path = "/checkout" component = {Checkout} />
         <Route path = "/orders" component = {Orders} />
         <Route path = "/auth" component = {Auth} />
        <Route path = "/"  exact component = {BurgerBuilder} />
         </Switch>
     
       </Layout>
      </div>
    );
  }
 
}

export default App;
