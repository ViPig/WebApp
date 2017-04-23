import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { showLoginModal } from '../../actions/setLoginModalVisible';

class LoginModal extends React.Component {
  handleClose = () => {
    this.props.showLoginModal(false);
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
          open={isShow.showModal.isShowing === undefined ? false : isShow.showModal.isShowing}
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
  showLoginModal: PropTypes.func.isRequired,
};
export default connect(null, { showLoginModal })(LoginModal);
