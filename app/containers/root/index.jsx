import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { Header, Layout, Drawer, Content, Navigation } from 'react-mdl';

import Tools from '../tools';
import MenuItem from '../../components/menu/menuItem';
import MenuTitle from '../../components/menu/menuTitle';

import { logout } from '../../reducers/auth/actions';

class RootComponent extends React.Component {
  render() {
    const { children, logoutAction, username, photo, ..._otherProps } = this.props;
    return (
      <Layout fixedDrawer fixedHeader >
        <Header title="Roll for Initiative" />
        <Drawer id="drawer" title={<MenuTitle username={username} photo={photo} />}>
          <Navigation>
            <MenuItem title="Logout" action={logoutAction} />
          </Navigation>
        </Drawer>
        <Content className="mdl-color--grey-100">
          <div className="mdl-grid">
            <div className="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col">
              { children }
            </div>
          </div>
          <Tools />
        </Content>
      </Layout>
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

