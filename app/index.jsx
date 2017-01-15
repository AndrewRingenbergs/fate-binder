import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Tools from './containers/tools';
import configureStore from './store';
import App from './containers/root';

const store = configureStore({});
const syncedHistory = syncHistoryWithStore(browserHistory, store);

render(
  <Provider history={syncedHistory} store={store}>
    <div>
      <App />
      <Tools />
    </div>
  </Provider>, document.getElementById('root'));
