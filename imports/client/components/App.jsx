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
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Cookies } from 'meteor/ostrio:cookies';
import i18n from 'meteor/universe:i18n';
import { Meteor } from 'meteor/meteor';
import Snackbar from 'material-ui/Snackbar';

import Routes, { onAuthChange } from '../../routes/routes';
import { showLoginModal, hideLoginModal } from '../actions/setLoginModalVisible';
import { showLeftDrawer, hideLeftDrawer } from '../actions/setLeftDrawerVisible';

import Store from '../store/store';
// import LoginModal from './Accounts/LoginModal';
import LeftDrawer from './Drawer/LeftDrawerContainer';
import HomeScreen from './Home';

const cookies = new Cookies();

function getLang() {
  return cookies.get('locale') ? cookies.get('locale') : 'vi';
}
i18n.setLocale(getLang());
const T = i18n.createComponent(i18n.createTranslator());

const styleSheet = createStyleSheet({
  root: {
    marginTop: 30,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  github: {
    fontSize: 32,
    color: '#ffffff',
  },
  avatar: {
    width: 32,
    height: 32,
  },
});

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      open: false,
      openBar: false,
      vertical: null,
      horizontal: null,
      message: null,
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
  handleLocal = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleSetLocal = (locale) => {
    this.setState({ open: false });
    if (locale !== '') {
      cookies.set('locale', locale);
      i18n.setLocale(getLang());
    }
  };
  handleLogout = state => () => {
    Meteor.logout();
    this.setState({ openBar: true, message: 'You have successfully logged out!', ...state });
  }
  handleRequestClose = () => {
    this.setState({ openBar: false });
  };

  render() {
    // console.log('this.props', this.props);
    const { appState } = this.props;
    const classes = this.props.classes;
    const { vertical, horizontal, openBar, message } = this.state;
    return (
      <div>
        {/* <FlatButton label="Login" onTouchTap={() => this.setState({ open: true })} /> */}
        <AppBar position="static" className="appbar-background">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" onTouchTap={() => this.showLeftDrawer()}>
              {appState.leftDrawer.showLD ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              <Link to="/"><T>sign_in</T></Link>
            </Typography>
            {!Meteor.userId() ? <Link to="/Login"><Button raised dense >
              Join!
            </Button></Link> : <Button raised dense onClick={this.handleLogout({ vertical: 'top', horizontal: 'right' })}>
              Logout
            </Button>}
            <IconButton aria-label="Go to Github" className={classes.github} href="https://github.com/ViPig" target="_blank">
              <FaGithub />
            </IconButton>
            <IconButton
              color="accent"
              aria-label="Language"
              onClick={this.handleLocal}
              aria-owns={this.state.open ? 'simple-menu' : null}
              aria-haspopup="true"
            >
              {cookies.get('locale') === 'vi' ? <Avatar alt="Tiếng Việt" src="./images/flags/vietnam.png" className={classes.avatar} /> : <Avatar alt="English" src="./images/flags/united-states.png" className={classes.avatar} />}

            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onRequestClose={() => this.handleSetLocal()}
            >
              <MenuItem onClick={() => this.handleSetLocal('vi')}><Avatar alt="Remy Sharp" src="./images/flags/vietnam.png" className={classes.avatar} /> Tiếng Việt</MenuItem>
              <MenuItem onClick={() => this.handleSetLocal('en')}><Avatar alt="Remy Sharp" src="./images/flags/united-states.png" className={classes.avatar} /> English</MenuItem>
            </Menu>
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
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openBar}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
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
