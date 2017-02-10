import React from 'react';

import css from './login.scss';

class LoginButton extends React.Component {
  render() {
    return (
      <div key={this.props.name} >
        <button className={css.loginButton} onClick={this.props.action}>
          <i className={`fa fa-4x fa-fw ${this.props.icon}`} />
          <br />
          Sign in
        </button>
      </div>);
  }
}

LoginButton.propTypes = {
  name: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
};

export default LoginButton;
