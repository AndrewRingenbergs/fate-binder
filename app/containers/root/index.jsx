import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Header, Layout, Drawer, Content, Navigation } from 'react-mdl';

import Tools from '../tools';
import MenuItem from '../../components/menu/menuItem';
import MenuTitle from '../../components/menu/menuTitle';

import { signOut } from '../../reducers/auth/actions';

class RootComponent extends React.Component {
  render() {
    const { children, logout, username, photo, ..._otherProps } = this.props;
    return (
      <Layout fixedDrawer fixedHeader >
        <Header title="Roll for Initiative" />
        <Drawer id="drawer" title={<MenuTitle username={username} photo={photo} />}>
          <Navigation>
            <MenuItem title="Logout" action={logout} />
          </Navigation>
        </Drawer>
        <Content>
          { children }
          <Tools />
        </Content>
      </Layout>
    );
  }
}

RootComponent.propTypes = {
  children: PropTypes.element,
  logout: PropTypes.func,
  username: PropTypes.string,
  photo: PropTypes.string,
};

const NO_OP = () => {};

RootComponent.defaultProps = {
  children: {},
  logout: NO_OP,
  username: null,
  photo: null,
};

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    photo: state.auth.photo,
  };
}

export default connect(mapStateToProps, { logout: signOut })(RootComponent);

