import { List, Map } from 'immutable';
// import { handleActions } from 'redux-actions';

import { DISPLAY_ERROR, CLEAR_ERROR } from './action-types';

// export default handleActions({
//   DISPLAY_ERROR: (state, { payload }) => {
//     const { message, id } = payload;
//     return state.push(Map({ message, id }));
//   },
//   CLEAR_ERROR: (state, { payload }) => (
//     state.filterNot(v => v.get('id') === payload.id)
//   ),
// }, List());
//
export default function (state = List()) { return state; }
