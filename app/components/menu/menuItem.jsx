import React, { PropTypes } from 'react';

import Button from 'react-toolbox/lib/button';

import css from './menu.css';

export default class MenuItem extends React.Component {
  render() {
    const { title, action, ..._otherProps } = this.props;
    return (
      <Button onClick={action} theme={css} inverse>
        {title}
      </Button>
    );
  }
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func,
};

MenuItem.defaultProps = {
  action: () => {},
};

