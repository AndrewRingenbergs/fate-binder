import * as actions from './actions';
import * as actionTypes from './action-types';

describe('error actions', () => {
  describe('display error', () => {
    it('should return action with type DISPLAY_ERROR', () => {
      const result = actions.displayError('message');
      expect(result.type).toEqual(actionTypes.DISPLAY_ERROR);
    });

    it('should contain message in payload', () => {
      const message = 'Danger Will Robenson';
      const result = actions.displayError(message);
      expect(result.payload.message).toEqual(message);
    });

    it('should contain a uuid in payload', () => {
      const message = 'Danger Will Robenson';
      const result = actions.displayError(message);
      const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(result.payload.id).toMatch(uuidRegex);
    });
  });

  describe('clearError', () => {
    it('should return action with type CLEAR_ERROR', () => {
      const result = actions.clearError('id');
      expect(result.type).toEqual(actionTypes.CLEAR_ERROR);
    });

    it('should contain a id in payload', () => {
      const result = actions.clearError('id');
      expect(result.payload.id).toEqual('id');
    });
  });

});
