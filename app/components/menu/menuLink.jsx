import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import Button from 'react-toolbox/lib/button';
import css from './menu.css';

export default class MenuLink extends React.Component {
  render() {
    return (<Link to={this.props.to} activeClassName="active">
      <Button theme={css} inverse>
        {this.props.title}
      </Button>
    </Link>);
  }
}

MenuLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.object,
      hash: PropTypes.string,
    }),
  ]).isRequired,
};