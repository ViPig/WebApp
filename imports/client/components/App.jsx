import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import CloseIcon from 'material-ui-icons/Close';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import FaGithub from 'react-icons/lib/fa/github';
import Routes, { onAuthChange } from '../../routes/routes';
import { showLoginModal, hideLoginModal } from '../actions/setLoginModalVisible';
import { showLeftDrawer, hideLeftDrawer } from '../actions/setLeftDrawerVisible';

import Store from '../store/store';
// import LoginModal from './Accounts/LoginModal';
import LeftDrawer from './Drawer/LeftDrawerContainer';
import HomeScreen from './Home';


const styleSheet = createStyleSheet({
  root: {
    marginTop: 30,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  github: {
    fontSize: 36,
    color: '#ffffff',
  },
});

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

    // console.log('getState', Store.getState());
  }
  render() {
    // console.log('this.props', this.props);
    const { appState } = this.props;
    // console.log('showModal', appState);
    const classes = this.props.classes;
    return (
      <div>
        {/* <FlatButton label="Login" onTouchTap={() => this.setState({ open: true })} /> */}
        <AppBar position="static" className="appbar-background">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" onTouchTap={() => this.showLeftDrawer()}>
              {appState.leftDrawer.showLD ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              <Link to="/">Home</Link>
            </Typography>
            <IconButton aria-label="Go to Github" className={classes.github} href="https://github.com/ViPig" target="_blank">
              <FaGithub />
            </IconButton>
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
  // console.log('state', state);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(MainMenu)));
