import React from 'react';
import { shallow } from 'enzyme';
import { HeadingComponent } from './index';

describe('<Heading />', ()=>{
  test('should contain the name of the application', ()=>{
    const app = shallow(<HeadingComponent />);
    expect(app.text()).toContain('Roll for Initiative');
  });

  describe('when user is logged in', () => {
    test('should contain the username', ()=>{
      const name = 'Eve';
      const app = shallow(<HeadingComponent authenticated={true} username={name}/>);

      expect(app.text()).toContain(name);
    });

    test('should contain a logout button', ()=>{
      const name = 'Eve';
      const app = shallow(<HeadingComponent authenticated={true} username={name}/>);

      const buttons = app.find('button')

      expect(buttons).toHaveLength(1);
      expect(buttons.text()).toBe('Logout');
    });
  });
  describe('when user is not logged in', () => {
    const app = shallow(<HeadingComponent authenticated={false} username={null}/>);

    test('should contain "Guest"', ()=>{
      expect(app.text()).toContain('Guest');
    });

    test('should not contain a logout button', ()=>{
      const buttons = app.find('button')
      expect(buttons).toHaveLength(0);
    });
  })
});
