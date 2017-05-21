import React from 'react';
import { connect } from 'react-redux';
import Portrait from '../../components/portrait';

import * as fateActions from '../../reducers/fate/actions';

class DemoComponent extends React.Component {
  render() {
    const goblin = {
      name: 'Gobin Thief',
      photo: 'https://firebasestorage.googleapis.com/v0/b/roll-for-initiatve.appspot.com/o/demo-goblin.jpg?alt=media&token=1c8bb8ff-0004-4a76-93b1-8426dc3d0b42',
    };
    return (<div>
      <h1 className="page-title">Fate Core</h1>
      <Portrait {... goblin} />
      <button type="button" onClick={this.props.clickTest}>{clickedState}</button>
    </div>);
  }
}

DemoComponent.propTypes = {
  clickTest: React.PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {
    clickedState: state.fate.get('clickedState')
  };
}

/*
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(fateActions, dispatch)
  };
}*/
/*
export default connect(mapStateToProps, mapDispatchToProps)(DemoComponent);
export default DemoComponent;*/

export default connect(mapStateToProps, fateActions)(DemoComponent);

