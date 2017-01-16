import authReducer from './reducer';

import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types';

describe('Authentication Reducer', () => {
  describe('INIT_AUTH', () => {
    it('should set authenticated to false when payload is null', () => {
      const state = authReducer(undefined, {
        type: INIT_AUTH,
        payload: null,
        username: null,
      });
      expect(state.authenticated).toBe(false);
      expect(state.id).toBe(null);
      expect(state.username).toBe(null);
    });

    it('should set AuthState.authenticated to true when payload provided', () => {
      const state = authReducer(undefined, {
        type: INIT_AUTH,
        payload: { uid: '123', displayName: 'Someone'}
      });

      expect(state.authenticated).toBe(true);
      expect(state.id).toBe('123');
      expect(state.username).toBe('Someone');
    });
  });

  describe('SIGN_IN_SUCCESS', () => {
    it('should set AuthState.authenticated to true', () => {
      const state = authReducer(undefined, {
        type: INIT_AUTH,
        payload: { uid: '123', displayName: 'Someone'}
      });

      expect(state.authenticated).toBe(true);
      expect(state.id).toBe('123');
      expect(state.username).toBe('Someone');
    });
  });


  describe('SIGN_OUT_SUCCESS', () => {
    it('should set AuthState.authenticated to false', () => {
      let state = authReducer(undefined, {
        type: SIGN_OUT_SUCCESS
      });

      expect(state.authenticated).toBe(false);
      expect(state.id).toBe(null);
      expect(state.username).toBe(null);
    });

    it('should set AuthState.authenticated to false if already logged in', () => {
      let state = authReducer({authenticated: true, id: '123', username: 'Someone'}, {
        type: SIGN_OUT_SUCCESS
      });

      expect(state.authenticated).toBe(false);
      expect(state.id).toBe(null);
      expect(state.username).toBe(null);
    });
  });
});
