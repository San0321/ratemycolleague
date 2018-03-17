import React, { Component } from 'react';

import Homepage from './Homepage.js';
import Searched from './Searched.js';
import Profile from './Profile.js';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'; 
//import {store} from "./index.js"
import {  Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { syncHistoryWithStore, routeReducer } from 'react-router-redux';
//import createBrowserHistory from 'history/createBrowserHistory'

//const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {

  
  
  render() {
    return (
      <div className="currentPage">
        <BrowserRouter>
          <Switch>
            <Route exact path="/profile"  render={(props) => (<Profile {...props}/> )}/>
            <Route exact path="/"  render={(props) => (<Homepage {...props}/> )}/> 
            <Route exact path="/searched"  render={(props) => (<Searched {...props}/>  )}/> 
          </Switch>
        </BrowserRouter>
  
        
      </div>
    );
  }
}

export default App;

