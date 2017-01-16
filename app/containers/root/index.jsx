import React from 'react';
import Header from '../heading';
import Login from '../login';

export default class Root extends React.Component {
  render() {
    return (<div>
      <Header />
      <Login />
    </div>);
  }
}
