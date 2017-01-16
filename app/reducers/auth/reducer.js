import { Record } from 'immutable';

import {
  INIT_AUTH,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
} from './action-types';

export const AuthState = new Record({
  authenticated: false,
  id: null,
  username: null,
  photo: null,
  error: null,
});

export default function authReducer(state = new AuthState(), { payload, type }) {
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS:
      return state.merge({
        authenticated: !!payload,
        id: payload ? payload.uid : null,
        username: payload ? payload.displayName : null,
        photo: payload ? payload.photoURL : null,
        error: null,
      });
    case SIGN_OUT_SUCCESS:
      return new AuthState();
    case SIGN_IN_ERROR:
      return new AuthState().merge({
        error: payload ? payload.errorMessage : null,
      });
    default:
      return state;
  }
}
