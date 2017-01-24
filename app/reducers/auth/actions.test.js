
jest.mock('../../firebase', () => {
	console.log('mock');
});

import * as authActions from './actions';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from './action-types';

describe('auth actions', () => {
  describe('signInSuccess', () => {
    it('should return the correct action', () => {
      const result = { user: 'name' };
      const action = authActions.signInSuccess(result);
      expect(action).toEqual({type: SIGN_IN_SUCCESS, payload: 'name'})
    });
  });
  describe('signOutSuccess', () => {
    it('should return the correct action', () => {
      const action = authActions.signOutSuccess();
      expect(action).toEqual({type: SIGN_OUT_SUCCESS})
    });
  });
  describe('signInError', () => {
    it('should return the correct action', () => {
      const error = { message: 'message' }
      const action = authActions.signInError(error);
      expect(action).toEqual({
        type: SIGN_IN_ERROR,
        payload: { errorMessage: 'message' },
      })
    });
  });
  describe('initAuth', () => {
    it('should return the correct action', () => {
      const user = { name: 'name' }
      const action = authActions.initAuth(user);
      expect(action).toEqual({
        type: INIT_AUTH,
        payload: user,
      })
    });
  });
  fdescribe('signOut', () => {
    it('???', () => {
			authActions.signOut()();
    });
  });
});
