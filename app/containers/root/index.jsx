import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { List } from 'immutable';

import { Header, Layout, Drawer, Content, Navigation, Snackbar } from 'react-mdl';

import Tools from '../tools';
import MenuItem from '../../components/menu/menuItem';
import MenuTitle from '../../components/menu/menuTitle';

import ErrorMessage from '../../components/errorMessage';

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
          <div>
            <div className={`mdl-snackbar ${this.props.errors.length > 0 ? 'mdl-snackbar--active' : ''}`} >
              <div>
                {this.props.errors.map(e =>
                  <div key={e.id} className={'mdl-snackbar__text'} >
                    <ErrorMessage id={e.id} message={e.message} />
                  </div>,
                )}
              </div>
            </div>
          </div>
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
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
    }),
  ),
};

const NO_OP = () => {};

RootComponent.defaultProps = {
  children: {},
  logoutAction: NO_OP,
  username: null,
  photo: null,
  errors: [],
};

function mapStateToProps(state) {
  const authState = state.getIn(['firebase', 'auth']) || {};
  const errors = state.getIn(['error'], List()).toJS();
  return {
    username: authState.displayName,
    photo: authState.photoURL,
    errors,
  };
}

export default connect(mapStateToProps, { logoutAction: logout })(firebaseConnect()(RootComponent));

