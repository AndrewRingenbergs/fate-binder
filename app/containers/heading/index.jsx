import React from 'react';
import { connect } from 'react-redux';

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
    const user = this.props.username || 'Guest';
    const photo = this.props.photo ? <img src={this.props.photo} alt="profile" width="25" height="25" /> : null;
    const logoutButton = this.props.authenticated ? <button>Logout</button> : null;

    return (<div className={`pure-menu pure-menu-horizontal ${css.homeMenu}`}>
      <h4 className="pure-menu-heading">{message}</h4>
      <span className={css.userDisplay}>
        { photo }
        { user }
        { logoutButton }
      </span>
    </div>);
  }
}

HeadingComponent.propTypes = {
  username: React.PropTypes.string,
  authenticated: React.PropTypes.bool.isRequired,
  photo: React.PropTypes.string,
};

HeadingComponent.defaultProps = {
  username: null,
  photo: null,
};

export default connect(mapStateToProps)(HeadingComponent);
