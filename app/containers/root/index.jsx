import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { List } from 'immutable';

import AppBar from 'react-toolbox/lib/app_bar';
import { Layout, Panel, NavDrawer } from 'react-toolbox/lib/layout';

import * as pageActions from '../../reducers/page/actions';

import Measure from '../measure';
import Tools from '../tools';
import MenuItem from '../../components/menu/menuItem';
import MenuLink from '../../components/menu/menuLink';
import MenuTitle from '../../components/menu/menuTitle';

import drawerTheme from './drawer-dark-theme.scss';

import { logout } from '../../reducers/auth/actions';

class RootComponent extends React.Component {
  render() {
    const { children, drawerOpen, username, photo, sizes, ..._otherProps } = this.props;
    const logoutAction = () => this.props.logoutAction().then(this.props.closeDrawer);
    return (
      <Layout style={{ height: '100vh' }}>
        <NavDrawer
          id="drawer"
          theme={drawerTheme}
          active={drawerOpen}
          onOverlayClick={this.props.closeDrawer}
          permanentAt="md"
        >
          <MenuTitle username={username} photo={photo} />
          <MenuLink title="Demo" to="/demo" action={this.props.closeDrawer} />
          <MenuLink title="Fate" to="/fatecore" action={this.props.closeDrawer} />
          <MenuItem title="Logout" action={logoutAction} />
        </NavDrawer>
        <Panel>
          <AppBar
            theme={drawerTheme}
            leftIcon={sizes.md ? null : 'menu'}
            title="Roll for Initiative"
            onLeftIconClick={this.props.openDrawer}
          />
          {children}
          <Tools />
        </Panel>
      </Layout>
    );
  }
}

RootComponent.propTypes = {
  children: PropTypes.element,
  logoutAction: PropTypes.func,
  drawerOpen: PropTypes.bool,
  openDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
  username: PropTypes.string,
  photo: PropTypes.string,
  sizes: PropTypes.shape({ md: PropTypes.bool }),
};

const NO_OP = () => {};

RootComponent.defaultProps = {
  children: {},
  logoutAction: NO_OP,
  username: null,
  photo: null,
  drawerOpen: false,
  openDrawer: NO_OP,
  closeDrawer: NO_OP,
  sizes: { md: false },
};

function mapStateToProps(state) {
  const authState = state.getIn(['firebase', 'auth']) || {};
  return {
    username: authState.displayName,
    photo: authState.photoURL,
    drawerOpen: state.getIn(['page', 'drawerOpen']),
  };
}

const FirebaseComponent = firebaseConnect()(Measure()(RootComponent));

export default connect(
  mapStateToProps, {
    logoutAction: logout,
    closeDrawer: pageActions.closeDrawer,
    openDrawer: pageActions.openDrawer,
  })(FirebaseComponent);

