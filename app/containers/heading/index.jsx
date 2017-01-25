import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { signOut } from '../../reducers/auth/actions';

import css from './heading.css';

@CSSModules(css)
export class HeadingComponent extends React.Component {
  render() {
    const message = 'Roll for Initiative';
    const photo = this.props.photo ? <img className={css.profilePic} src={this.props.photo} alt="profile" width="35" height="35" /> : null;
    const logoutButton = <button onClick={this.props.signOut}>Logout</button>;

    return (<div className="pure-menu pure-menu-horizontal" styleName="home-menu">
      <h2 className="pure-menu-heading">{message}</h2>
      <div styleName="user-display">
        <span styleName="photo-span">{ this.props.photo ? photo : null }</span>
        <span styleName="username">{this.props.username || 'Guest'}</span>
        <span>{this.props.authenticated ? logoutButton : null}</span>
      </div>
    </div>);
  }
}

HeadingComponent.propTypes = {
  authenticated: React.PropTypes.bool.isRequired,
  signOut: React.PropTypes.func.isRequired,
  username: React.PropTypes.string,
  photo: React.PropTypes.string,
};

HeadingComponent.defaultProps = {
  username: null,
  photo: null,
};

export default connect(state => state.auth, { signOut })(HeadingComponent);

