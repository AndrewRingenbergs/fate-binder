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

import { HeadingComponent } from './index';
import HeadingConect from './index';



const NOOP = () => {};

describe('<Heading />', ()=>{
  test('should contain the name of the application', ()=>{
    const app = shallow(<HeadingComponent authenticated={false} signOut={NOOP} />);
    expect(app.text()).toContain('Roll for Initiative');
  });

  describe('when user is logged in', () => {
    test('should contain the username', ()=>{
      const name = 'Eve';
      const app = shallow(<HeadingComponent authenticated={true} username={name} signOut={NOOP}/>);

      expect(app.text()).toContain(name);
    });

    test('should contain a logout button', ()=>{
      const name = 'Eve';
      const app = shallow(<HeadingComponent authenticated={true} username={name} signOut={NOOP}/>);

      const buttons = app.find('button')

      expect(buttons).toHaveLength(1);
      expect(buttons.text()).toBe('Logout');
    });

    test('should call signOut when button is clicked', () => {
      const signOut = jest.fn();
      const app = shallow(<HeadingComponent authenticated={true} username={null} signOut={signOut}/>);

      app.find('button').simulate('click');

      expect(signOut.mock.calls).toHaveLength(1);
    });
  });
  describe('when user is not logged in', () => {
    const app = shallow(<HeadingComponent authenticated={false} username={null} signOut={NOOP}/>);

    test('should contain "Guest"', ()=>{
      expect(app.text()).toContain('Guest');
    });

    test('should not contain a logout button', ()=>{
      const buttons = app.find('button')
      expect(buttons).toHaveLength(0);
    });
  });

  describe('when user is not logged in', () => {
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

    fit('should dispatch logout action', () => {
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
