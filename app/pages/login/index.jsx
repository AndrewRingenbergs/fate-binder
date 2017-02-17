import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

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

    const error = this.props.loginError;

    return (
      <div className={css.signInForm}>
        <h1 className={css.signInHeading}>Sign in</h1>
        {
          buttons.map(provider =>
            <div key={`login-${provider.name}`} className={css.buttonWrapper} >
              <LoginButton
                key={provider.name}
                name={provider.name}
                icon={provider.icon}
                action={provider.action}
              />
            </div>,
          )
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
  loginError: React.PropTypes.string,
};

LoginComponent.defaultProps = {
  loginError: null,
};

function mapStateToProps() {
  return {};
}

export default firebaseConnect()(connect(mapStateToProps, authActions)(LoginComponent));

