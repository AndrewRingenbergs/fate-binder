import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../reducers/error/actions';

export class ErrorMessageComponent extends React.Component {
  componentWillMount() {
    setTimeout(() => this.props.clearError(this.props.id), 3000);
  }
  render() {
    return <div> Error: {this.props.message} </div>;
  }
}

ErrorMessageComponent.propTypes = {
  id: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default connect(null, { clearError })(ErrorMessageComponent);

