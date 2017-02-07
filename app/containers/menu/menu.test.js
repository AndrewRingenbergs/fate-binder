import React from 'react';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';


jest.mock('../../reducers/auth/actions.js', () => {
  return { signOut: () =>
    (dispatch) =>
      dispatch({type: 'SIGN_OUT'})
  }
});

import Menu from './index';
import { MenuComponant } from './index';

const NO_OP = () => {};

describe('<Menu />', () => {
  it('should render close button', () => {
    const app = shallow(<MenuComponant showCloseButton={true} closeAction={NO_OP} />);
    expect(app.find('IconButton').props().faClass).toEqual('fa-times');
  });

  it('should call the close action', () => {
    const closeAction = jest.fn();
    const app = mount(<MenuComponant showCloseButton={true} closeAction={closeAction}/>);
    app.find('IconButton').simulate('click');
    expect(closeAction.mock.calls.length).toEqual(1);
  });


  it('should not render close button', () => {
    const app = shallow(<MenuComponant showCloseButton={false} closeAction={NO_OP}/>);
    expect(app.find('IconButton').length).toEqual(0);
  });

  it('should display the username if logged in', () => {
    const authState = { username: 'Someone' };
    const app = shallow(<MenuComponant
      authState={authState}
      showCloseButton={false}
      closeAction={NO_OP}/>
    );
    expect(app.html()).toContain('Someone');
  });

  describe('connected App', () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    const store = mockStore({
      auth: {
        authenticated: true,
        username: 'Someone',
      }
    });

    const app = mount(
      <Provider store={store}>
        <Menu closeAction={NO_OP} showCloseButton={false} />
      </Provider>
    );

    test('should contain username', ()=>{
      expect(app.text()).toContain('Someone');
    });

    xit('should dispatch logout action', () => {
      app.find("#logout-button").props().onClick()
      app.first('#logout-button').simulate('click');
      expect(store.getActions()).toEqual([{type: "SIGN_OUT"}]);
    });
  });
});
