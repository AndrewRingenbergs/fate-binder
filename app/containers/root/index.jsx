import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { List } from 'immutable';

import AppBar from 'react-toolbox/lib/app_bar';

import Tools from '../tools';
import MenuItem from '../../components/menu/menuItem';
import MenuTitle from '../../components/menu/menuTitle';


import { logout } from '../../reducers/auth/actions';

class RootComponent extends React.Component {
  render() {
    const { children, logoutAction, username, photo, ..._otherProps } = this.props;
    return (
      <div>
        <AppBar title={"Roll for Initiative"} />
        <MenuTitle username={username} photo={photo} />
        <MenuItem title="Logout" action={logoutAction} />
        { children }
        <Tools />
      </div>
    );
  }
}

RootComponent.propTypes = {
  children: PropTypes.element,
  logoutAction: PropTypes.func,
  username: PropTypes.string,
  photo: PropTypes.string,
};

const NO_OP = () => {};

RootComponent.defaultProps = {
  children: {},
  logoutAction: NO_OP,
  username: null,
  photo: null,
};

function mapStateToProps(state) {
  const authState = state.getIn(['firebase', 'auth']) || {};
  return {
    username: authState.displayName,
    photo: authState.photoURL,
  };
}

export default connect(mapStateToProps, { logoutAction: logout })(firebaseConnect()(RootComponent));

