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

    const error = this.props.loginError;

    return (
      <div className={`mdl-grid ${css.signInForm}`}>
        <h1 className={`mdl-cell mdl-cell--12-col ${css.signInHeading}`}>Sign in</h1>
        <h3 className={`mdl-cell mdl-cell--12-col ${css.signInError}`}> {error} </h3>
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
  loginError: React.PropTypes.string,
};

LoginComponent.defaultProps = {
  loginError: null,
};

function mapStateToProps(state) {
  return { loginError: state.auth.error };
}

export default connect(mapStateToProps, authActions)(LoginComponent);
