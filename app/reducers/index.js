import { combineReducers } from 'redux-immutable';
import { firebaseStateReducer } from 'react-redux-firebase';

import routing from './routing';
import error from './error';

export default combineReducers({
  firebase: firebaseStateReducer,
  routing,
  error,
});

