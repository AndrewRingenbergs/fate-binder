import React from 'react';

import LoginButton from './LoginButton';
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
        {
          buttons.map(provider =>
            <LoginButton
              key={provider.name}
              name={provider.name}
              icon={provider.icon}
            />)
        }
      </div>
    );
  }
}
