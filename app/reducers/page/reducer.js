import { Map } from 'immutable';

import * as actionTypes from './action-types';

export default function pageReducer(state = Map({ drawerOpen: false }), action) {
  switch (action.type) {
    case actionTypes.CLOSE_DRAWER:
      return state.set('drawerOpen', false);
    case actionTypes.OPEN_DRAWER:
      return state.set('drawerOpen', true);
    case actionTypes.TOGGLE_DRAWER:
      return state.set('drawerOpen', !state.get('drawerOpen'));
    default:
      return state;
  }
}
