import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import reducer from '../reducers';

const storeOptions = process.env.NODE_ENV === 'production' ? {} : require('./configureStore.dev');

const extraMiddleware = storeOptions.middleware || [];

const NOOP = () => {};
const postCreateStore = storeOptions.postCreateStore || NOOP;


export default function configureStore(browserHistory) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    autoRehydrate(),
    applyMiddleware(routerMiddleware(browserHistory)),
    ...extraMiddleware,
  )(createStore);

  const store = createStoreWithMiddleware(reducer);

  postCreateStore(store);

  return store;
}

