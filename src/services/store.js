import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './master-reducer';

const loggerMiddleware = createLogger();

const middlewareList = [
			loggerMiddleware,
			thunk
		];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default function(initalState) {
 const store =  composeEnhancers(
    applyMiddleware(...middlewareList) 
   )(createStore)(reducers,initalState);  
  return store;
}