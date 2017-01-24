import firebase from 'firebase';
import { push } from 'react-router-redux';
import { firebaseAuth } from '../../firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from './action-types';

export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user,
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: { errorMessage: error.message },
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS,
  };
}

function authenticate(provider) {
  return (dispatch) => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .then(() => dispatch(push('/')))
      .catch(error => dispatch(signInError(error)));
  };
}

export function initAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user,
  };
}

export function signInWithGithub() {
  return authenticate(new firebase.auth.GithubAuthProvider());
}


export function signInWithGoogle() {
  return authenticate(new firebase.auth.GoogleAuthProvider());
}

export function signInWithFacebook() {
  return authenticate(new firebase.auth.FacebookAuthProvider());
}

export function signInWithTwitter() {
  return authenticate(new firebase.auth.TwitterAuthProvider());
}

export function signOut() {
  return (dispatch) => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()))
      .then(() => dispatch(push('/login')));
  };
}
