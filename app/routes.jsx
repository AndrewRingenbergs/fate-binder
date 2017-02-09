import React from 'react';
import { Route } from 'react-router';

import { UserAuthWrapper } from 'redux-auth-wrapper';

import Root from './containers/root';
import Login from './pages/login';
import Home from './pages/home';

export const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  failureRedirectPath: '/login',
  authSelector: state => state.getIn(['firebase', 'auth']),
  authenticatingSelector: state => state.getIn(['firebase', 'isInitializing']) === true,
  predicate: auth => auth !== null,
});

export const UserIsNotAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  failureRedirectPath: '/',
  authSelector: state => state.getIn(['firebase', 'auth']),
  authenticatingSelector: state => state.getIn(['firebase', 'isInitializing']) === true,
  predicate: auth => auth === null,
});


export default function routes() {
  return (
    <Route path="" component={Root}>
      <Route path="/login" component={UserIsNotAuthenticated(Login)} />
      <Route path="/" component={UserIsAuthenticated(Home)} />
    </Route>
  );
}
