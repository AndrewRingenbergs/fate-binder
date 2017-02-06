import React from 'react';

import stylePropType from 'react-style-proptype';

export default class IconButton extends React.Component {
  render() {
    const style = {
      ...{
        background: 'none',
        border: 'none',
        margin: '0px',
        padding: '0px',
      },
      ...this.props.style,
    };
    return (
      <button
        style={style}
        className="no-button"
        onClick={this.props.onClick}
      >
        <i className={`fa ${this.props.faClass} ${this.props.extraClass.join(' ')}`} />
      </button>
    );
  }
}

IconButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  faClass: React.PropTypes.string.isRequired,
  style: stylePropType,
  extraClass: React.PropTypes.arrayOf(React.PropTypes.string),
};

IconButton.defaultProps = {
  extraClass: [],
  style: {},
};

