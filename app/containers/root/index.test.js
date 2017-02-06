import jest from 'jest';

import React from 'react';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-shallow-renderer';
import App from './index';

describe('<App />', ()=>{
  describe('for desktop mode', () => {
    global.matchMedia = () => {
      return {
        matches: false,
        addListener: () => {},
      }
    };

    test('should match snapshot', ()=>{
      const app = shallowRenderer(<App><p>Hello World</p></App>);
      expect(app).toMatchSnapshot();
    });
  });

  describe('for mobile mode', () => {
    global.matchMedia = () => {
      return {
        matches: true,
        addListener: () => {},
      }
    };

    test('should match snapshot', ()=>{
      const app = shallowRenderer(<App><p>Hello World</p></App>);
      expect(app).toMatchSnapshot();
    });
  });
});
