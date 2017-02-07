import React from 'react';
import { shallow , render } from 'enzyme';

import IconButton from './iconButton';

const NO_OP = () => {};

describe('<IconButton />', () => {
  it('should render the given font awesome class', () => {
    const app = render(<IconButton faClass={'fa-cross'} onClick={NO_OP} />);
    const iconClass = app.find('button').find('i').get(0).attribs.class;

    expect(iconClass).toContain('fa-cross');
  });

  it('should trigger onClick event', () => {
    const onClick = jest.fn();
    const app = shallow(<IconButton faClass={'fa-cross'} onClick={onClick} />);

    app.simulate('click');

    expect(onClick.mock.calls.length).toEqual(1);
  });

});
