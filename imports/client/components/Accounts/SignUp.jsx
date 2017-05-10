import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  height: 450,
  width: 300,
};
const style_1 = {
  height: 80,
  width: 300,
  backgroundColor: '#263238',
};

const largeIcon = {
  width: 60,
  height: 60,
  display: 'flex',
  // alignItems: 'center',
};
const loginButton = {
  display: 'flex',
  width: 257,
};
const textFieldColor = {
  color: '#212121',
  borderColor: '#212121',
};

const PaperExampleRounded = () => (
  <div className="login_page">
    <div data-reactroot>
      <div className="login_page_paper">
        <div>
          <Paper style={style} zDepth={5} rounded >
            <Paper style={style_1} zDepth={1} >
              <ActionAccountCircle color="#EEEEEE" style={largeIcon} className="login_page_icon" />
            </Paper>
            <Divider />
            <div className="login_page_form">
              <TextField
                hintText="Enter your account"
                floatingLabelText="Username"
                underlineFocusStyle={textFieldColor}
                floatingLabelFocusStyle={textFieldColor}
              />
              <TextField
                type="password"
                hintText="Enter your password"
                floatingLabelText="Password"
                underlineFocusStyle={textFieldColor}
                floatingLabelFocusStyle={textFieldColor}
              />
              <TextField
                type="password"
                hintText="Re-enter your password"
                floatingLabelText="Confirm Password"
                underlineFocusStyle={textFieldColor}
                floatingLabelFocusStyle={textFieldColor}
              />
              <TextField
                type="email"
                hintText="Enter your email"
                floatingLabelText="Email"
                underlineFocusStyle={textFieldColor}
                floatingLabelFocusStyle={textFieldColor}
              />
              <RaisedButton
                label="Sign Up"
                labelPosition="before"
                primary
                style={loginButton}
                buttonStyle={{ backgroundColor: '#263238' }}
              />
              <div className="login_page_register">
                <Link to="/Login" >Already have an account?</Link>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  </div>
);

export default PaperExampleRounded;
