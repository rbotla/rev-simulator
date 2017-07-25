import { combineReducers } from 'redux';
import data from './data/data';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ data, routing: routerReducer, form: formReducer });