import React from 'react';
import { persistStore } from 'redux-persist';


class AppWrapper extends React.Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(this.props.store, { blacklist: ['routing'] }, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (this.state.rehydrated) {
      return this.props.children;
    }
    return <h1>Loading... { JSON.stringify(this.state, null, 2) }</h1>;
  }
}

AppWrapper.propTypes = {
  children: React.PropTypes.element,
  store: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

AppWrapper.defaultProps = {
  children: {},
};

export default AppWrapper;
