import React from 'react';

import IconButton from '../../components/iconButton';
import css from './heading.scss';

export default class HeadingComponent extends React.Component {
  render() {
    const message = 'Roll for Initiative';
    const openButton = this.props.showMenuButton ? (
      <IconButton
        faClass="fa-bars"
        onClick={this.props.menuAction}
      />) :
      null;

    return (<div className={`pure-menu pure-menu-horizontal ${css.homeMenu}`} >
      <h2 className="pure-menu-heading"> { openButton } {message} </h2>
    </div>);
  }
}

HeadingComponent.propTypes = {
  showMenuButton: React.PropTypes.bool,
  menuAction: React.PropTypes.func,
};

HeadingComponent.defaultProps = {
  showMenuButton: false,
  menuAction: () => {},
};
