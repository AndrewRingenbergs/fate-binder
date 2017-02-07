import React from 'react';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-shallow-renderer';
import App from './index';

import { shallow, render } from 'enzyme';

describe('<App />', ()=>{
  const matchMedia = {};
  beforeEach(() => {
    matchMedia.matches = true;
    matchMedia.addListener = jest.fn();
    matchMedia.removeListener = jest.fn();

    global.matchMedia = () => matchMedia;
  });

  describe('for desktop mode', () => {
    test('should match snapshot', () => {
      matchMedia.matches = true;

      const app = shallowRenderer(<App><p>Hello World</p></App>);
      expect(app).toMatchSnapshot('a');
    });
  });

  describe('for mobile mode', () => {
    test('should match snapshot', ()=>{
      matchMedia.matches = false;

      const app = shallowRenderer(<App><p>Hello World</p></App>);
      expect(app).toMatchSnapshot();
    });
  });

  test('should add and remove listener remove listener', () => {
    const app = shallow(<App><p>Hello</p></App>)
    expect(matchMedia.addListener.mock.calls.length).toEqual(1);

    app.unmount();
    expect(matchMedia.removeListener.mock.calls.length).toEqual(1);
    expect(matchMedia.removeListener.mock.calls[0][0]).toEqual(matchMedia.addListener.mock.calls[0][0]);

  });

  it('should change sidebarDocked state on mediaQueryChange', () => {
    matchMedia.matches = true;

    const app = shallow(<App><p>Hello World</p></App>);
    expect(app.find('Sidebar').props().docked).toEqual(true)

    matchMedia.matches = false;
    matchMedia.addListener.mock.calls[0][0]();

    expect(app.find('Sidebar').props().docked).toEqual(false)
  });

  it('should open and close the sidebar', () => {
    matchMedia.matches = false;

    const app = shallow(<App><p>Hello World</p></App>);
    expect(app.find('Sidebar').props().docked).toEqual(false)
    expect(app.find('Sidebar').props().open).toEqual(false)

    app.find('Sidebar').props().children.find(e => e.props.menuAction).props.menuAction();
    expect(app.find('Sidebar').props().open).toEqual(true)


    app.find('Sidebar').props().sidebar.props.closeAction();
    expect(app.find('Sidebar').props().open).toEqual(false)
  });
});
