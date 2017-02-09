import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'react-mdl/extra/material';

import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './app';
import configureStore from './store';
import routes from './routes';

const store = configureStore(browserHistory);
const syncedHistory = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  },
});

function bindCheckAuth(redux) {
  return (check, handler) => (nextState, transition) => {
    const firebase = redux.getState().get('firebase');
    const authState = firebase.get('auth');
    if (check(authState)) {
      handler(nextState, transition);
    }
  };
}

render((
  <App store={store}>
    <Provider history={syncedHistory} store={store}>
      <Router history={browserHistory}>
        { routes(bindCheckAuth(store)) }
      </Router>
    </Provider>
  </App>
), document.getElementById('root'));
