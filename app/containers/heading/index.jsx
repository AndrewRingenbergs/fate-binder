import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../reducers/auth/actions';

import css from './heading.css';

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
    photo: state.auth.photo,
  };
}

export class HeadingComponent extends React.Component {
  render() {
    const message = 'Roll for Initiative';
    const photo = this.props.photo ? <img className={css.profilePic} src={this.props.photo} alt="profile" width="35" height="35" /> : null;
    const logoutButton = <button onClick={this.props.signOut}>Logout</button>;

    return (<div className={`pure-menu pure-menu-horizontal ${css.homeMenu}`}>
      <h2 className="pure-menu-heading">{message}</h2>
      <div className={css.userDisplay}>
        <span className={css.photoSpan}>{ this.props.photo ? photo : null }</span>
        <span className={css.username}>{this.props.username || 'Guest'}</span>
        <span>{this.props.authenticated ? logoutButton : null}</span>
      </div>
    </div>);
  }
}

HeadingComponent.propTypes = {
  username: React.PropTypes.string,
  authenticated: React.PropTypes.bool.isRequired,
  photo: React.PropTypes.string,
  signOut: React.PropTypes.func.isRequired,
};

HeadingComponent.defaultProps = {
  username: null,
  photo: null,
};

export default connect(mapStateToProps, { signOut })(HeadingComponent);
