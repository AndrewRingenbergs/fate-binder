import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { List } from 'immutable';

import AppBar from 'react-toolbox/lib/app_bar';
import { Layout, Panel, NavDrawer } from 'react-toolbox/lib/layout';

import Measure from '../measure';
import Tools from '../tools';
import MenuItem from '../../components/menu/menuItem';
import MenuLink from '../../components/menu/menuLink';
import MenuTitle from '../../components/menu/menuTitle';

import drawerTheme from './drawer-dark-theme.scss';

import { logout } from '../../reducers/auth/actions';

class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  render() {
    const { children, logoutAction, username, photo, sizes, ..._otherProps } = this.props;
    return (
      <Layout>
        <NavDrawer
          id="drawer"
          theme={drawerTheme}
          active={this.state.drawerOpen}
          onOverlayClick={this.toggleDrawer}
          permanentAt="md"
        >
          <MenuTitle username={username} photo={photo} />
          <MenuLink title="Demo" to="/demo" />
          <MenuItem title="Logout" action={logoutAction} />
        </NavDrawer>
        <Panel>
          <AppBar
            theme={drawerTheme}
            leftIcon={sizes.md ? null : 'menu'}
            title="Roll for Initiative"
            onLeftIconClick={this.toggleDrawer}
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
  sizes: { md: false },
};

function mapStateToProps(state) {
  const authState = state.getIn(['firebase', 'auth']) || {};
  return {
    username: authState.displayName,
    photo: authState.photoURL,
  };
}

const FirebaseComponent = firebaseConnect()(Measure()(RootComponent));

export default connect(mapStateToProps, { logoutAction: logout })(FirebaseComponent);

