import React, { PropTypes } from 'react';

import Button from 'react-mdl/lib/Button';

import css from './menu.css';

export default class MenuItem extends React.Component {
  render() {
    const { title, action, ..._otherProps } = this.props;
    return (
      <Button ripple onClick={action} className={css.navButton}>
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

