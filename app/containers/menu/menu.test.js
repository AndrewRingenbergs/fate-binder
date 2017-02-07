import React from 'react';
import { shallow, mount } from 'enzyme';

import Menu from './index';

const NO_OP = () => {};

describe('<Menu />', () => {
  it('should render close button', () => {
    const app = shallow(<Menu showCloseButton={true} closeAction={NO_OP} />);
    expect(app.find('IconButton').props().faClass).toEqual('fa-times');
  });

  it('should call the close action', () => {
    const closeAction = jest.fn();
    const app = mount(<Menu showCloseButton={true} closeAction={closeAction}/>);
    app.find('IconButton').simulate('click');
    expect(closeAction.mock.calls.length).toEqual(1);
  });


  it('should not render close button', () => {
    const app = shallow(<Menu showCloseButton={false} closeAction={NO_OP}/>);
    expect(app.find('IconButton').length).toEqual(0);
  })
});
