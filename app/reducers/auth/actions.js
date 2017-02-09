import { push } from 'react-router-redux';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from './action-types';

export function logout() {
  return (dispatch, _, getFirebase) =>
    getFirebase().logout()
      .then(() => dispatch(push('/login')));
}

function authenticateWith(provider) {
  return (dispatch, _, getFirebase) => {
    getFirebase().login({ provider, type: 'popup' })
      .then(() => dispatch(push('/')));
  };
}

export function signInWithGithub() {
  return authenticateWith('github');
}

export function signInWithGoogle() {
  return authenticateWith('google');
}

export function signInWithFacebook() {
  return authenticateWith('facebook');
}

export function signInWithTwitter() {
  return authenticateWith('twitter');
}
