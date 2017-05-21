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

// New libs
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import { showLoginModal, hideLoginModal } from '../actions/setLoginModalVisible';
import { showLeftDrawer, hideLeftDrawer } from '../actions/setLeftDrawerVisible';

import Store from '../store/store';
// import LoginModal from './Accounts/LoginModal';
import LeftDrawer from './Drawer/LeftDrawer';

class ContactForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
ContactForm = reduxForm({
  form: 'contact', // a unique name for this form
})(ContactForm);

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

  // New funcs
  submit = (values) => {
    console.log(values);
  }
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
        <Grid fluid>
          <Row className="stats">
            <Col xs={12} sm md lg>
              <div>
                <Paper style={{ height: 100, width: 100, margin: 20, textAlign: 'center', display: 'inline-block' }} zDepth={5}>
                  <img src="http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg" alt="" />
                </Paper>
              </div>
            </Col>
            <Col xs={12} sm md lg>
              <div>
                <Paper style={{ height: 100, width: 100, margin: 20, textAlign: 'center', display: 'inline-block' }} zDepth={5}>
                  <img src="http://material-ui.com/images/grid-list/burger-827309_640.jpg" alt="" />
                </Paper>
              </div>
            </Col>
            <Col xs={12} sm md lg>
              <div>
                <Paper style={{ height: 100, width: 100, margin: 20, textAlign: 'center', display: 'inline-block' }} zDepth={5}>
                  <img src="http://material-ui.com/images/grid-list/camera-813814_640.jpg" alt="" />
                </Paper>
              </div>
            </Col>
          </Row>
          <Divider />
          <Row className="upload">
            <Col xs>
              <ContactForm onSubmit={this.submit} />
            </Col>
          </Row>
        </Grid>

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
