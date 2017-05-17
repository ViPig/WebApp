import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  height: 300,
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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function showResults(values) {
  await sleep(500);
  email = values.email;
  password = values.password;

  Meteor.loginWithPassword({ email }, password, (err) => {
    if (err) {
      window.alert(JSON.stringify(err, null, 2));
    }

    return (<Redirect to="/Home" />);
  });
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
                <ActionAccountCircle color="#EEEEEE" style={largeIcon} className="login_page_icon" />
              </Paper>
              <Divider />
              <form onSubmit={handleSubmit(showResults)}>
                <div className="login_page_form">
                  <Field
                    type="email"
                    name="email"
                    component={renderTextField}
                    hintText="Enter your e-mail"
                    label="Email"
                    underlineFocusStyle={textFieldColor}
                    floatingLabelFocusStyle={textFieldColor}
                  />
                  <Field
                    name="password"
                    component={renderTextField}
                    hintText="Enter your password"
                    label="Password"
                    type="password"
                    underlineFocusStyle={textFieldColor}
                    floatingLabelFocusStyle={textFieldColor}
                  />
                  <RaisedButton
                    type="submit"
                    label="Login"
                    labelPosition="before"
                    primary
                    disabled={pristine || submitting}
                    style={loginButton}
                    buttonStyle={{ backgroundColor: '#263238' }}
                  />
                  <div className="login_page_register">
                    <Link to="/SignUp" >Don&apos;t have an account?</Link>
                  </div>
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
