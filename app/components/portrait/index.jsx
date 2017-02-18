import React, { PropTypes } from 'react';

import unknown from './unknown-character.png';
import Avatar from 'react-toolbox/lib/avatar';

import css from './portrait.scss';

class Portrait extends React.Component {

  render() {
    return (<div className={css.wrapper}>
      <span className={css.name}>{this.props.name}</span>
        <img className={css.image} src={this.props.photo || unknown} />
      <Avatar className={css.avatar} title={this.props.user.name} />
    </div>);
  }
}
Portrait.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
  }),
};

Portrait.defaultProps = {
  photo: null,
  user: { name: '?' },
};

export default Portrait;
