import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  autoRehydrate(),
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(reducer);

  persistStore(store);

  return store;
}

