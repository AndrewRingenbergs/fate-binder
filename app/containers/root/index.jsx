import React from 'react';
import _ from 'lodash';

export default class Root extends React.Component {
  render() {
    return (<div className="pure-menu pure-menu-horizontal home-menu">
      <a className="pure-menu-heading">{_.join(['Roll', 'for', 'Initiative'], '\n')}</a>
    </div>);
  }
}
