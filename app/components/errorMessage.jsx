import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function clearMessage(id) {
  return (dispatch) => {
    dispatch({ type: 'CLEAR ERROR', payload: { id } });
  };
}

export class ErrorMessageComponent extends React.Component {
  componentWillMount() {
    setTimeout(() => this.props.clearMessage(this.props.id), 3000);
  }
  render() {
    return <div> Error: {this.props.message} </div>;
  }
}

ErrorMessageComponent.propTypes = {
  id: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default connect(null, { clearMessage })(ErrorMessageComponent);

