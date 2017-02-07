import React from 'react';

import IconButton from '../../components/iconButton';
import css from './menu.scss';


export default class Menu extends React.Component {
  render() {
    const closeButton = this.props.showCloseButton ? (
      <IconButton
        style={{ float: 'right', margin: '0px 16px' }}
        faClass="fa-times"
        onClick={this.props.closeAction}
      />) :
      null;

    return (
      <div className={css.menu}>
        <h2> Menu {closeButton}</h2>
      </div>);
  }
}

Menu.propTypes = {
  showCloseButton: React.PropTypes.bool.isRequired,
  closeAction: React.PropTypes.func.isRequired,
};
