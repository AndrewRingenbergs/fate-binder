import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import { signOut } from '../../reducers/auth/actions';

import IconButton from '../../components/iconButton';
import css from './menu.scss';

@CSSModules(css)
export class MenuComponant extends React.Component {
  render() {
    const photo = this.props.authState.photo ?
      <img className={css.profilePic} src={this.props.authState.photo} alt="profile" width="50" height="50" /> :
      null;
    const closeButton = this.props.showCloseButton ? (
      <IconButton
        style={{ float: 'right', margin: '4px 16px', fontSize: '1.5em' }}
        faClass="fa-times"
        onClick={this.props.closeAction}
      />) :
      null;

    const signOut = () => {
      this.props.signOut().then(() => this.props.closeAction());
    }

    return (
      <div className={css.menu}>
        <div className={css.topSection}>
          <div>{closeButton}</div>
          <div className={css.profile}>
            { this.props.authState.username }
            { photo }
          </div>
        </div>
        <div>
          <ul className={css.menuItems}>
            <li><button id="logout-button" onClick={signOut} className={css.menuButton}>Logout</button></li>
          </ul>
        </div>
      </div>);
  }
}

MenuComponant.propTypes = {
  showCloseButton: React.PropTypes.bool.isRequired,
  closeAction: React.PropTypes.func.isRequired,
  logoutAction: React.PropTypes.func,
  authState: React.PropTypes.shape({
    username: React.PropTypes.string,
    photo: React.PropTypes.string,
  }),
};

MenuComponant.defaultProps = {
  authState: {},
};

function mapStateToProps(state) {
  return { authState: state.auth };
}


export default connect(mapStateToProps, { signOut })(MenuComponant);
