import reducer from './reducer';

import { DISPLAY_ERROR, CLEAR_ERROR } from './action-types'

import { List, fromJS } from 'immutable';

xdescribe('error reducer', () => {
  describe('init', () => {
    it('should initialise with empty list', () => {
      expect(reducer(undefined, { type: 'init'} ).toJS()).toEqual([]);
    });
  });

  describe('DISPLAY_ERROR', () => {
    it('should add new error to the list of errors', () => {
      const state = List();

      const message = 'Danger Will Robenson';
      const id = '123456';
      const action = {
        type: DISPLAY_ERROR,
        payload: { message, id },
      }

      const newState = reducer(state, action).toJS();

      expect(newState.length).toBe(1);
      expect(newState).toEqual([{message, id}]);
    });

    it('should place new error at the end of the list', () => {
      const oldError = { message: 'old Error', id: '654321' };
      const state = fromJS([oldError]);

      const message = 'Danger Will Robenson';
      const id = '123456';
      const action = {
        type: DISPLAY_ERROR,
        payload: { message, id },
      }

      const newState = reducer(state, action).toJS();

      expect(newState.length).toBe(2);
      expect(newState).toEqual([oldError, {message, id}]);
    });
  });

  describe('CLEAR_ERROR',() => {
    it('should clear the error with the given id', () => {
      const error1 = { message: 'error1', id: '1' };
      const error2 = { message: 'error2', id: '2' };

      const state = fromJS([error1, error2]);

      const action = {
        type: CLEAR_ERROR,
        payload: { id: '1' },
      }

      const newState = reducer(state, action).toJS();

      expect(newState).toEqual([error2]);
    });
  });

});
