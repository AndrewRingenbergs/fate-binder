import React from 'react';
import { Route } from 'react-router';
import Root from './containers/root';
import Login from './containers/login';
import Home from './containers/home';

function isLoggedIn(authState) {
  return authState.authenticated;
}

function isLoggedOut(authState) {
  return !isLoggedIn(authState);
}

function transitionTo(page) {
  return (nextState, transition) => {
    transition(page, {
      next: nextState.location.pathname,
    });
  };
}

export default function routes(authFunction) {
  const loggedInCheck = authFunction(isLoggedIn, transitionTo('/home'));
  const loggedOutCheck = authFunction(isLoggedOut, transitionTo('/login'));

  return (
    <Route path="" component={Root}>
      <Route path="/login" component={Login} onEnter={loggedInCheck} />
      <Route path="/" component={Home} onEnter={loggedOutCheck} />
    </Route>
  );
}
