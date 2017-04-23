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

import { showLoginModal, hideLoginModal } from '../actions/setLoginModalVisible';
import LoginModal from './accounts/LoginModal';

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

  showLoginModal() {
    this.props.showLoginModal(true);
  }
  render() {
    console.log('this.props', this.props);
    const { showModal } = this.props;
    console.log('showModal', showModal);

    return (
      <div>
        {/* <FlatButton label="Login" onTouchTap={() => this.setState({ open: true })} /> */}
        <AppBar
          title="Home"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={this.state.logged ? <Logged /> : <FlatButton label="Login" onTouchTap={() => this.showLoginModal()} />}
        />
        <LoginModal
          showModal={showModal}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    showModal: state,
  };
}
MainMenu.propTypes = {
  showLoginModal: PropTypes.func.isRequired,
  showModal: PropTypes.object,
};

export default connect(mapStateToProps, { showLoginModal })(MainMenu);
