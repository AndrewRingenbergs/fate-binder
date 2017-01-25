import { push } from 'react-router-redux';
import * as authActions from './actions';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from './action-types';
import * as firebase from '../../firebase';
import firebaseAPI from 'firebase';


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

  describe('signOut', () => {
    beforeEach(()=>{
      firebase.firebaseAuth.signOut = jest.fn();
    });

    it('should sign out and redirect', (done) => {
      firebase.firebaseAuth.signOut.mockReturnValueOnce(new Promise((resolve, reject) => {
        resolve();
      }));

      const dispatch = jest.fn();
      authActions.signOut()(dispatch)
        .then(() => {
          expect(dispatch.mock.calls.length).toBe(2)
          expect(dispatch.mock.calls[0][0].type).toBe(SIGN_OUT_SUCCESS)
          expect(dispatch.mock.calls[1][0]).toEqual(push('/login'))
          done()
        }).catch(e => {done.fail(e)});
    });
  });

  [
    {name: 'Github', provider: new firebaseAPI.auth.GithubAuthProvider(), signInFunc: authActions.signInWithGithub},
    {name: 'Google', provider: new firebaseAPI.auth.GoogleAuthProvider(), signInFunc: authActions.signInWithGoogle},
    {name: 'facebook', provider: new firebaseAPI.auth.FacebookAuthProvider(), signInFunc: authActions.signInWithFacebook},
    {name: 'twitter', provider: new firebaseAPI.auth.TwitterAuthProvider(), signInFunc: authActions.signInWithTwitter},
  ].map(({name, provider, signInFunc}) => {

    describe(`signInWith${name}`, () => {
      beforeEach(()=>{
        firebase.firebaseAuth.signInWithPopup = jest.fn();
      });

      it('on failure should return error action', (done) => {
        firebase.firebaseAuth.signInWithPopup
          .mockReturnValueOnce(new Promise((resolve, reject) => {
            reject('failed');
          }));

        const dispatch = jest.fn();
        signInFunc()(dispatch)
          .then(() => {
            expect(dispatch.mock.calls[0][0].type).toEqual(SIGN_IN_ERROR)
            done()
          }).catch(e => {done.fail(e)});
      });

      it('on success should sign in and redirect', (done) => {
        firebase.firebaseAuth.signInWithPopup
          .mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({user: 'name'});
          }));

        const dispatch = jest.fn();
        signInFunc()(dispatch)
          .then(() => {
            expect(firebase.firebaseAuth.signInWithPopup).toHaveBeenCalledWith(provider);

            expect(dispatch.mock.calls[0][0].type).toEqual(SIGN_IN_SUCCESS)
            expect(dispatch.mock.calls[0][0].payload).toEqual('name')
            expect(dispatch.mock.calls[1][0]).toEqual(push('/'))
            done()
          }).catch(e => {done.fail(e)});
      });
    });
  });
});
