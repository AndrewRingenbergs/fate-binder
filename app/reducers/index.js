import { combineReducers } from 'redux-immutable';
import { firebaseStateReducer } from 'react-redux-firebase';

import routing from './routing';

export default combineReducers({
  firebase: firebaseStateReducer,
  routing,
});

