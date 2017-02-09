import { List, Map } from 'immutable';
import uuid from 'uuid';


export default function (state = List(), action) {
  if (action.type === 'ERROR') {
    const message = action.payload.message;
    const id = uuid.v4();
    return state.push(Map({ message, id }));
  } else if (action.type === 'CLEAR ERROR') {
    return state.filterNot(v => v.get('id') === action.payload.id);
  }
  return state;
}
