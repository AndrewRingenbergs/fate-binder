import React, { PropTypes } from 'react';

import css from './menu.css';

export default class MenuItem extends React.Component {
  render() {
    const { title, action, ..._otherProps } = this.props;
    return (
      <button onClick={action} className={css.navButton}>
        {title}
      </button>
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

