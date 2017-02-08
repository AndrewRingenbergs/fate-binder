import React, { PropTypes } from 'react';

import { Button } from 'react-mdl';

import css from './menu.css';

export default class MenuItem extends React.Component {
  render() {
    const { title, action, ..._otherProps } = this.props;
    return (
      <Button ripple className={css.navButton} onClick={action}>
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

