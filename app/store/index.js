import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist-immutable';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import reducer from '../reducers';
import firebaseConfig from '../firebase/config';

const storeOptions = process.env.NODE_ENV === 'production' ? {} : require('./configureStore.dev');

const extraMiddleware = storeOptions.middleware || [];

const NOOP = () => {};
const postCreateStore = storeOptions.postCreateStore || NOOP;


export default function configureStore(browserHistory) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    autoRehydrate(),
    applyMiddleware(routerMiddleware(browserHistory)),
    reactReduxFirebase(firebaseConfig, { enableLogging: false }),
    ...extraMiddleware,
  )(createStore);

  const store = createStoreWithMiddleware(reducer);

  postCreateStore(store);

  return store;
}

