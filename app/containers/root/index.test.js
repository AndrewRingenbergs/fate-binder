import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('<App />', ()=>{
  test('should contain the name of the application', ()=>{
    const app = shallow(<App />);
    expect(app.text()).toEqual('Roll for Initiative');
  });
});
