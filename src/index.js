import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
//import {appReducer} from './appReducer';
//import {routeReducer} from "react-router-redux";
//import { createStore, combineReducers } from 'redux';
//import TestUtils from 'react-addons-test-utils';

//
import {appReducer, store} from "./appReducer";
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
