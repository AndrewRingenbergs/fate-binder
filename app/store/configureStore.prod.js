import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const middleware = applyMiddleware(thunk);

export default function configureStore(initialState) {
  return createStore(reducer, initialState, middleware);
}

