import React from 'react';

import Portrait from '../../components/portrait';

class DemoComponent extends React.Component {
  render() {
    const goblin = {
      name: 'Gobin Theif',
      photo: 'https://firebasestorage.googleapis.com/v0/b/roll-for-initiatve.appspot.com/o/demo-goblin.jpg?alt=media&token=1c8bb8ff-0004-4a76-93b1-8426dc3d0b42',
    };
    return (<div>
      <h1 className="page-title">Demo</h1>
      <Portrait {... goblin} />
    </div>);
  }
}

export default DemoComponent;

