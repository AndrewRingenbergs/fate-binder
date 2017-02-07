import {
  INIT_AUTH,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
} from './action-types';

const DefaultAuthState = {
  authenticated: false,
  id: null,
  username: null,
  photo: null,
  error: null,
};

export default function authReducer(state = DefaultAuthState, { payload, type }) {
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: !!payload && payload.uid != null,
        id: payload ? payload.uid : null,
        username: payload ? payload.displayName : null,
        photo: payload ? payload.photoURL : null,
        error: null,
      };
    case SIGN_OUT_SUCCESS:
      return DefaultAuthState;
    case SIGN_IN_ERROR:
      return {
        ...DefaultAuthState,
        error: payload ? payload.errorMessage : null,
      };
    default:
      return state;
  }
}
