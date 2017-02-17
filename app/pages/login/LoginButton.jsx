import React from 'react';

import Button from 'react-toolbox/lib/button';

import css from './login.scss';

class LoginButton extends React.Component {
  render() {
    return (
      <div key={this.props.name} >
        <Button className={css.loginButton} onClick={this.props.action} raised>
          <i className={`fa fa-4x fa-fw ${this.props.icon}`} />
          <br />
          Sign in
        </Button>
      </div>);
  }
}

LoginButton.propTypes = {
  name: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
};

export default LoginButton;
