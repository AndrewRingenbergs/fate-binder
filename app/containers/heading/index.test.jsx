import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';

import * as actions from '../../reducers/auth/actions';
jest.mock('../../reducers/auth/actions.js', () => {
  return { signOut: (a) => {
    return {type: "SIGN_OUT"}
  }};
})

import HeadingComponent from './index';
import HeadingConect from './index';

const NOOP = () => {};

describe('<Heading />', ()=>{
  test('should contain the name of the application', ()=>{
    const app = shallow(<HeadingComponent />);
    expect(app.text()).toContain('Roll for Initiative');
  });

  test.skip('should show button TODO', () => {})
  test.skip('should hide button TODO', () => {})
  test.skip('should call menu action', () => {})


  describe.skip('when user is not logged in', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      auth: {
        authenticated: true,
          username: 'Someone',
      }
    });

    const app = mount(
      <Provider store={store}>
        <HeadingConect />
      </Provider>
    );

    test('should contain username', ()=>{
      expect(app.text()).toContain('Someone');
    });

    it('should dispatch logout action', () => {
      app.find("#logout-button").props().onClick()
      app.first('#logout-button').simulate('click');
      expect(store.getActions()).toEqual([{type: "SIGN_OUT"}]);
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.resetModules();
  })
});
