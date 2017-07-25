import React from 'react';
import { Route } from 'react-router';
import App from './App';
import DataHome from './components/data/data-home';
import ConfigHome from './components/config/config-home';
import PageNotFound from './components/page-not-found';
import Login from './components/auth/login';

function checkLogin(nextState, replace) {
  if(!localStorage.getItem('userToken') || !localStorage.getItem('empId')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route>
    <Route path="/login" component={Login} />
    <Route component={App} onEnter={checkLogin}>
      <Route path="/" component={ConfigHome} />
      <Route path="/config" component={ConfigHome} />
      <Route path="/staging" component={DataHome} />
      <Route path="/graph" />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Route>
);