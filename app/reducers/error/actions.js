import * as uuid from 'uuid';
import * as actionTypes from './action-types';

export function displayError(message) {
  return { type: actionTypes.DISPLAY_ERROR, payload: { id: uuid.v4(), message } };
}

export function clearError(id) {
  return { type: actionTypes.CLEAR_ERROR, payload: { id } };
}
