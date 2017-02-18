import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ThemeProvider } from 'react-css-themr';

import App from './app';
import configureStore from './store';
import routes from './routes';

import theme from '../react-toolbox-theme/theme';

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
    <ThemeProvider theme={theme} >
      <Provider history={syncedHistory} store={store}>
        <Router history={browserHistory}>
          { routes(bindCheckAuth(store)) }
        </Router>
      </Provider>
    </ThemeProvider>
  </App>
), document.getElementById('root'));
