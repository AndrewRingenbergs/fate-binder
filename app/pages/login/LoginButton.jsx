import React from 'react';
import CSSModules from 'react-css-modules';

import css from './login.scss';

@CSSModules(css)
class LoginButton extends React.Component {
  render() {
    return (
      <div key={this.props.name} className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
        <button styleName="login-button" type="button" onClick={this.props.action}>
          <i className={`fa fa-4x fa-fw ${this.props.icon}`} />
          <br />
          Sign in with {this.props.name}
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
