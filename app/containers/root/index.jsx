import React from 'react';
import Header from '../heading';
import Tools from '../tools';

class RootComponent extends React.Component {
  render() {
    return (<div>
      <Header />
      { this.props.children }
      <Tools />
    </div>);
  }
}

RootComponent.propTypes = {
  children: React.PropTypes.element,
};

RootComponent.defaultProps = {
  children: {},
};

export default RootComponent;

