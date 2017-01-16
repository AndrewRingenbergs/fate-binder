import jest from 'jest';

import React from 'react';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-shallow-renderer';
import App from './index';

describe('<App />', ()=>{
  test('should contain the name of the application', ()=>{
    const app = shallowRenderer(<App />);
    expect(app).toMatchSnapshot();
  });
});
