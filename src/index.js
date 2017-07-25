import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './services/store';
  
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
	  <Router history={history}>
	    {routes}
	  </Router>
	</Provider>,
  document.getElementById('root')
);
