/* eslint-disable import/no-extraneous-dependencies */
import { persistState } from 'redux-devtools';
/* eslint-enable import/no-extraneous-dependencies */

import DevTools from '../containers/tools';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

  return (matches && matches.length > 0) ? matches[1] : null;
}

export const middleware = [DevTools.instrument(), persistState(getDebugSessionKey())];

export function postCreateStore(store) {
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../reducers/index').default;
      /* eslint-enable global-require */

      store.replaceReducer(nextReducer);
    });
  }
}
