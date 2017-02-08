import React from 'react';
import { Button } from 'react-mdl';

import css from './login.scss';

class LoginButton extends React.Component {
  render() {
    return (
      <div key={this.props.name} className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone">
        <Button raised ripple className={css.loginButton} onClick={this.props.action}>
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
