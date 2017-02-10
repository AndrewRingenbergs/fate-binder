import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class ErrorDisplayComponent extends React.Component {
  render() {

  }
}

ErrorDisplayComponent.propTypes = {
  clearError: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
    }),
  ).isRequired,
}

function mapStateToProps(state) {
  return { errors: state.get('error') };
}


export default connect(mapStateToProps, {})(ErrorDisplayComponent);
