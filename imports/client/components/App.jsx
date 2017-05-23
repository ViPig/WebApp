import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import { showLoginModal, hideLoginModal } from '../actions/setLoginModalVisible';
import { showLeftDrawer, hideLeftDrawer } from '../actions/setLeftDrawerVisible';

import Store from '../store/store';
// import LoginModal from './Accounts/LoginModal';
import LeftDrawer from './Drawer/LeftDrawer';
import HomeScreen from './Home';

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class MainMenu extends Component {
  static muiName = 'FlatButton';
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // showLoginModal() {
  //   this.props.showLoginModal(true);
  // }
  showLeftDrawer() {
    if (!Store.getState().leftDrawer.showLD) {
      this.props.showLeftDrawer(true);
    } else {
      this.props.hideLeftDrawer();
    }

    console.log('getState', Store.getState());
  }
  render() {
    console.log('this.props', this.props);
    const { appState } = this.props;
    console.log('showModal', appState);

    return (
      <div>
        {/* <FlatButton label="Login" onTouchTap={() => this.setState({ open: true })} /> */}
        <AppBar
          className="appbar"
          title="Home"
          iconElementLeft={
            <IconButton
              onTouchTap={() => this.showLeftDrawer()}
            >
              <NavigationMenu />
            </IconButton>
          }
          // iconElementRight={this.state.logged ? <Logged /> : <FlatButton label="Login" onTouchTap={() => this.showLoginModal()} />}
        />
        {/* <LoginModal
          appState={appState}
        /> */}
        <LeftDrawer
          appState={appState}
        />
        <HomeScreen />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    appState: state,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // showLoginModal: (isShowing) => { dispatch(showLoginModal(isShowing)); },
    showLeftDrawer: (value) => { dispatch(showLeftDrawer(value)); },
    hideLeftDrawer: () => { dispatch(hideLeftDrawer()); },
  };
}

MainMenu.propTypes = {
  // showLoginModal: PropTypes.func.isRequired,
  showLeftDrawer: PropTypes.func.isRequired,
  hideLeftDrawer: PropTypes.func.isRequired,
  appState: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
