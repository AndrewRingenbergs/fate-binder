import React, { PropTypes } from 'react';

import css from './menu.css';

export default class MenuTitle extends React.Component {
  render() {
    const { username, photo, ..._otherProps } = this.props;
    const user = username || 'Guest';

    const avatar = photo ?
      <img className={css.avatar} src={photo} alt={`${user} profile`} /> :
      <div className={css.avatar}>{user.charAt(0)}</div>;

    return (
      <div className={css.menuTitleWrapper}>
        <div className={css.menuTitle}>
          {avatar} {user}
        </div>
      </div>
    );
  }
}

MenuTitle.propTypes = {
  username: PropTypes.string,
  photo: PropTypes.string,
};

MenuTitle.defaultProps = {
  username: 'Guest',
  photo: null,
};

