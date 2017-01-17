import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

/* eslint-disable import/no-extraneous-dependencies */
import { persistState } from 'redux-devtools';
/* eslint-enable import/no-extraneous-dependencies */

import rootReducer from '../reducers';
import DevTools from '../containers/tools';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

  return (matches && matches.length > 0) ? matches[1] : null;
}

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  autoRehydrate(),
  DevTools.instrument(),
  persistState(getDebugSessionKey()),
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer);

  persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../reducers/index').default;
      /* eslint-enable global-require */

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

