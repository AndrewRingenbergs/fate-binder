import React from 'react';
import Sidebar from 'react-sidebar';

import Header from '../heading';
import Tools from '../tools';
import Menu from '../menu';

import colours from '../../style-constants/colours.scss';

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      sideBarOpen: false,
      sideBarDocked: false,
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onToggleSidebar = this.onToggleSidebar.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 800px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql, sidebarDocked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onToggleSidebar() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: this.state.mql.matches });
  }

  setOpen(sidebarOpen) {
    this.setState({sidebarOpen});
  }

  render() {
    const sidebarContent = (
      <Menu
        showCloseButton={!this.state.sidebarDocked}
        closeAction={this.onToggleSidebar}
      />);
    const backgroundColor = colours.darkPrimary;
    return (<div>
      <Sidebar
        sidebar={sidebarContent}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        styles={{ sidebar: { backgroundColor } }}
        onSetOpen={this.setOpen}
      >
        <Header
          showMenuButton={!this.state.sidebarDocked}
          menuAction={this.onToggleSidebar}
        />
        { this.props.children }
        <Tools />
      </Sidebar>
    </div>);
  }
}

RootComponent.propTypes = {
  children: React.PropTypes.element,
};

RootComponent.defaultProps = {
  children: {},
};

export default RootComponent;

