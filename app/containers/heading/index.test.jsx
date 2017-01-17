import React from 'react';
import { shallow } from 'enzyme';
import { HeadingComponent } from './index';

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

  })
});
