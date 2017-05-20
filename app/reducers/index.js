import { combineReducers } from 'redux-immutable';
import { firebaseStateReducer } from 'react-redux-firebase';

import routing from './routing';
import error from './error/reducer';
import page from './page/reducer';
import fate from './fate/reducer';

export default combineReducers({
  firebase: firebaseStateReducer,
  routing,
  error,
  page,
  fate,
});

