import { Map } from 'immutable';

import * as actionTypes from './action-types';

export default function pageReducer(state = Map({ clickedState: false }), action) {
  switch (action.type) {
    case actionTypes.TOOGLE_TEST:
      return state.set('clickedState', !state.get('clickedState'));
    default:
      return state;
  }
}
