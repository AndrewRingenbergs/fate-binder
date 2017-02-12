import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';

import Measure from './index';

class DummyComponent extends React.Component {
  render() {
    return (<div id="component" >Hello World</div>)
  }
}

describe('Measure HOF', () => {
  it('should render the wrapped component', () => {
    const MeasuredComponent = (Measure()(DummyComponent));
    const wrapper = mount(<MeasuredComponent />);

    expect(wrapper.find('#component').text()).toEqual('Hello World');
  });

  it('should pass along the props', () => {
    const MeasuredComponent = (Measure()(DummyComponent));
    const wrapper = shallow(<MeasuredComponent prop1='prop' prop2='another' />);

    expect(wrapper.first().props().prop1).toEqual('prop');
    expect(wrapper.first().props().prop2).toEqual('another');
  });

  fdescribe('measurement', () => {
    let windowSize = 1000;
    const re = /(\d+)/;

    let mqls = [];
    afterEach(() => {
      mqls = [];
    });

    global.matchMedia = jest.fn(value => {
      const calculate = () =>  windowSize >= parseInt(value.match(re)[0])
      let mq = {
        matches: calculate(),
        removeListener: jest.fn(),
      }

      mq['update'] = () => {
        mq['matches'] = calculate();
        mq.addListener.mock.calls.forEach(args => args[0]())
      }
      mq['addListener'] = jest.fn();
      mqls.push(mq)
      return mq;
    })

    describe('default breakpoints', () => {
      it('should initialise to the correct default breakpoints', () => {
        const MeasuredComponent = (Measure()(DummyComponent));
        const wrapper = shallow(<MeasuredComponent />);
        const sizes = wrapper.first().props().sizes;

        expect(sizes.sm).toBe(true);
        expect(sizes.md).toBe(true);
        expect(sizes.lgTablet).toBe(false);
        expect(sizes.lg).toBe(false);
      });

      it('should change on resize', () => {
        const MeasuredComponent = (Measure()(DummyComponent));
        const wrapper = shallow(<MeasuredComponent />);

        windowSize = 900;
        mqls.forEach(e => e.update());
        const sizes = wrapper.first().props().sizes;

        expect(sizes.sm).toBe(true);
        expect(sizes.md).toBe(false);
        expect(sizes.lgTablet).toBe(false);
        expect(sizes.lg).toBe(false);
      });

      it('should remove listener', () => {
        const MeasuredComponent = (Measure()(DummyComponent));
        const wrapper = mount(<MeasuredComponent />).unmount();

        mqls.forEach(mql => {
          const addCalls = mql.addListener.mock.calls;
          const removeCalls = mql.removeListener.mock.calls;
          expect(removeCalls[0][0]).toEqual(addCalls[0][0]);
        });

      });

    });
  });
})
