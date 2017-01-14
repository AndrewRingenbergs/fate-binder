import React from 'react';
import _ from 'lodash';

export default class Root extends React.Component {
  render() {
    const message = _.join(['Roll', 'for', 'Initiative'], ' ');

    return (<div className="pure-menu pure-menu-horizontal home-menu">
      <a className="pure-menu-heading">{message}</a>
    </div>);
  }
}
