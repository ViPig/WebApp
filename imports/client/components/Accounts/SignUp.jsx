import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input/Input';
import InputLabel from 'material-ui/Input/InputLabel';
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
const textFieldColor = {
  color: '#212121',
  borderColor: '#212121',
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Input
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
            <Paper style={style}>
              <Paper style={style_1} >
                {/* <ActionAccountCircle color="#EEEEEE" style={largeIcon} className="login_page_icon" /> */}
              </Paper>
              <Divider />
              <form onSubmit={handleSubmit(createUser)}>
                <div className="login_page_form">
                  <Grid fluid>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <InputLabel htmlFor="first_name">Name</InputLabel>
                        <Field
                          type="text"
                          id="first_name"
                          name="first_name"
                          style={{ width: '100%' }}
                          component={renderTextField}
                          disableUnderline
                        />
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6}>
                        <InputLabel htmlFor="last_name">Name</InputLabel>
                        <Field
                          type="text"
                          name="last_name"
                          id="last_name"
                          style={{ width: '100%' }}
                          component={renderTextField}
                          label="Last Name"
                          disableUnderline
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <InputLabel htmlFor="email">Name</InputLabel>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          fullWidth
                          component={renderTextField}
                          label="Email"
                          disableUnderline
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <InputLabel htmlFor="password">Name</InputLabel>
                        <Field
                          name="password"
                          id="password"
                          type="password"
                          fullWidth
                          component={renderTextField}
                          label="Password"
                          disableUnderline
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <InputLabel htmlFor="password_confirm">Name</InputLabel>
                        <Field
                          name="password_confirm"
                          id="password_confirm"
                          type="password"
                          fullWidth
                          component={renderTextField}
                          label="Confirm Password"
                          disableUnderline
                        />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12} className="text-center">
                        <Button
                          raised
                          type="submit"
                          disabled={pristine || submitting}
                        >
                          Signup
                        </Button>
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
