import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Tools from './containers/tools';
import configureStore from './store';
import App from './containers/root';

const store = configureStore({});

render(
  <Provider store={store}>
    <div>
      <App />
      <Tools />
    </div>
  </Provider>, document.getElementById('root'));
