import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { hideLoginModal } from '../../actions/setLoginModalVisible';

class LoginModal extends React.Component {
  handleClose = () => {
    this.props.hideLoginModal();
  }
  render() {
    console.log('this.props', this.props);
    const isShow = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Login"
          titleStyle={{ textAlign: 'center' }}
          actions={actions}
          modal={false}
          contentStyle={{ width: 350 }}
          open={isShow.appState.loginModal.isShowing === undefined ? false : isShow.appState.loginModal.isShowing}
          onRequestClose={this.handleClose}
        >
          <div>
            <TextField
              hintText="Enter your username!"
              floatingLabelText="User"
              fullWidth
            /><br />
            <TextField
              hintText="Enter your password!"
              type="password"
              floatingLabelText="Password"
              fullWidth
            /><br />
          </div>

        </Dialog>
      </div>

    );
  }
}
LoginModal.propTypes = {
  hideLoginModal: PropTypes.func.isRequired,
};
export default connect(null, { hideLoginModal })(LoginModal);
