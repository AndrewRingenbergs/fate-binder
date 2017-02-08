import React from 'react';
import { connect } from 'react-redux';

import { Header, Layout, Drawer, Content, Navigation } from 'react-mdl';

import Tools from '../tools';
import MenuItem from '../../components/menu/menuItem';

import { signOut } from '../../reducers/auth/actions';

class RootComponent extends React.Component {
  render() {
    const { children, logout, ..._otherProps } = this.props;
    return (
      <Layout fixedDrawer fixedHeader >
        <Header title="Title">
          <Navigation />
        </Header>
        <Drawer title="Title">
          <Navigation>
            <MenuItem title="Logout" action={logout} />
            <a>Logout</a>
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
  children: React.PropTypes.element,
  logout: React.PropTypes.func,
};

const NO_OP = () => {};

RootComponent.defaultProps = {
  children: {},
  logout: NO_OP,
};


export default connect(state => state, { signOut })(RootComponent);

