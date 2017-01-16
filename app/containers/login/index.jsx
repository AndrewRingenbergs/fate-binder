import React from 'react';

import css from './login.scss';

export default class Login extends React.Component {
  render() {
    const buttons = [
      { name: 'Google', icon: 'fa-google' },
      { name: 'Github', icon: 'fa-github' },
      { name: 'Facebook', icon: 'fa-facebook' },
      { name: 'Twitter', icon: 'fa-twitter' },
    ];

    return (
      <div className="pure-g">
        <h1 className={`pure-u-1-1 ${css.signInHeading}`}>Sign in</h1>
        { buttons.map(provider =>
          <div key={provider.name} className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
            <div className={css.loginButton} type="button">
              <i className={`fa fa-4x fa-fw ${provider.icon}`} />
              <br />
              Sign in with {provider.name}
            </div>
          </div>)
        }
      </div>
    );
  }
}
