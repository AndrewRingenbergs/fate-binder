import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Root from './containers/root';
import Tools from './containers/tools';
import configureStore from './store';

const store = configureStore({});

render(
  <Provider store={store}>
    <div>
      <Root />
      <Tools />
    </div>
  </Provider>, document.getElementById('root'));
