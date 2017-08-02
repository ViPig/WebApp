import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
// import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import Button from 'material-ui/Button';

const style = {
  height: 450,
  width: 500,
};
const style_1 = {
  height: 80,
  width: 500,
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
  // width: 250,
};
const textFieldColor = {
  color: '#212121',
  borderColor: '#212121',
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function createUser(values) {
  await sleep(500);
  window.alert(JSON.stringify(values, null, 2));
  username = values.username;
  email = values.email;
  password = values.password;
  password_confirm = values.password_confirm;
  profile = {
    first_name: values.first_name,
    last_name: values.last_name,
  };
  if (password === password_confirm) {
    Accounts.createUser({ username, email, password, profile }, (err) => {
      if (err) {
        window.alert(JSON.stringify(err.reason, null, 2));
      }
    });
  } else {
    window.alert('Password does not match!');
  }
}
const PaperExampleRounded = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="login_page">
      <div data-reactroot>
        <div className="login_page_paper">
          <div>
            <Paper style={style} zDepth={5} rounded >
              <Paper style={style_1} zDepth={1} >
                {/* <ActionAccountCircle color="#EEEEEE" style={largeIcon} className="login_page_icon" /> */}
              </Paper>
              <Divider />
              <form onSubmit={handleSubmit(createUser)}>
                <div className="login_page_form">
                  <Grid fluid>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <Field
                          type="text"
                          name="first_name"
                          style={{ width: '100%' }}
                          component={renderTextField}
                          hintText="What is your First Name ?"
                          label="First Name"
                          underlineFocusStyle={textFieldColor}
                          floatingLabelFocusStyle={textFieldColor}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <Field
                          type="text"
                          name="last_name"
                          style={{ width: '100%' }}
                          component={renderTextField}
                          hintText="What is your Last Name ?"
                          label="Last Name"
                          underlineFocusStyle={textFieldColor}
                          floatingLabelFocusStyle={textFieldColor}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          type="email"
                          name="email"
                          fullWidth
                          component={renderTextField}
                          hintText="Enter your email"
                          label="Email"
                          underlineFocusStyle={textFieldColor}
                          floatingLabelFocusStyle={textFieldColor}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="password"
                          type="password"
                          fullWidth
                          component={renderTextField}
                          hintText="Enter your password"
                          label="Password"
                          underlineFocusStyle={textFieldColor}
                          floatingLabelFocusStyle={textFieldColor}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field
                          name="password_confirm"
                          type="password"
                          fullWidth
                          component={renderTextField}
                          hintText="Re-enter your password"
                          label="Confirm Password"
                          underlineFocusStyle={textFieldColor}
                          floatingLabelFocusStyle={textFieldColor}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Button
                          raised
                          type="submit"
                          label="Sign Up"
                          labelPosition="before"
                          primary
                          disabled={pristine || submitting}
                          style={loginButton}
                          buttonStyle={{ backgroundColor: '#263238' }}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <div className="login_page_register">
                          <Link to="/Login" >Already have an account?</Link>
                        </div>
                      </Col>
                    </Row>
                  </Grid>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'MaterialUiForm',
})(PaperExampleRounded);
