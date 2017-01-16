import React from 'react';
import { connect } from 'react-redux';

import * as authActions from '../../reducers/auth/actions';

import LoginButton from './LoginButton';
import css from './login.scss';

export class LoginComponent extends React.Component {
  render() {
    const buttons = [
      { name: 'Google', icon: 'fa-google', action: this.props.signInWithGoogle },
      { name: 'Github', icon: 'fa-github', action: this.props.signInWithGithub },
      { name: 'Facebook', icon: 'fa-facebook', action: this.props.signInWithFacebook },
      { name: 'Twitter', icon: 'fa-twitter', action: this.props.signInWithTwitter },
    ];

    return (
      <div className={`pure-g ${css.signInForm}`}>
        <h1 className={`pure-u-1-1 ${css.signInHeading}`}>Sign in</h1>
        {
          buttons.map(provider =>
            <LoginButton
              key={provider.name}
              name={provider.name}
              icon={provider.icon}
              action={provider.action}
            />)
        }
      </div>
    );
  }
}

LoginComponent.propTypes = {
  signInWithGithub: React.PropTypes.func.isRequired,
  signInWithGoogle: React.PropTypes.func.isRequired,
  signInWithFacebook: React.PropTypes.func.isRequired,
  signInWithTwitter: React.PropTypes.func.isRequired,
};

export default connect(null, authActions)(LoginComponent);
