import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Routes, { onAuthChange } from '../../routes/routes';
import { showLoginModal, hideLoginModal } from '../actions/setLoginModalVisible';
import { showLeftDrawer, hideLeftDrawer } from '../actions/setLeftDrawerVisible';

import Store from '../store/store';
// import LoginModal from './Accounts/LoginModal';
import LeftDrawer from './Drawer/LeftDrawerContainer';
import HomeScreen from './Home';


/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class MainMenu extends Component {
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

    //console.log('getState', Store.getState());
  }
  render() {
    //console.log('this.props', this.props);
    const { appState } = this.props;
    //console.log('showModal', appState);


    return (
      <div>
        {/* <FlatButton label="Login" onTouchTap={() => this.setState({ open: true })} /> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" onTouchTap={() => this.showLeftDrawer()}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              Home
            </Typography>
          </Toolbar>
        </AppBar>

        {/* <LoginModal
          appState={appState}
        /> */}
        <LeftDrawer
          appState={appState}
        />
        <Routes />
        {/* <HomeScreen /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log('state', state);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));
