import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('<App />', ()=>{
  test('should contain the name of the application', ()=>{
    const app = <App />;
    expect(app).toMatchSnapshot();
  });
});
