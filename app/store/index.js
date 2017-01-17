import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const storeOptions = process.env.NODE_ENV === 'production' ? {} : require('./configureStore.dev');

const extraMiddleware = storeOptions.middleware || [];

const NOOP = () => {};
const postCreateStore = storeOptions.postCreateStore || NOOP;

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  autoRehydrate(),
  ...extraMiddleware,
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(reducer);

  persistStore(store);

  postCreateStore(store);

  return store;
}

