import React from 'react';
import { Route, Redirect } from 'react-router';
import Root from './containers/root';

module.exports = (
  <Route path="/" component={Root}>
    <Redirect from="*" to="/" />
  </Route>
);
