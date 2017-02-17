import React, { PropTypes } from 'react';

import Avatar from 'react-toolbox/lib/avatar';

import css from './menu.css';

export default class MenuTitle extends React.Component {
  render() {
    const { username, photo, ..._otherProps } = this.props;
    const user = username || 'Guest';

    const avatar = <Avatar className={css.avatar} cover image={photo} title={user} />;

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

