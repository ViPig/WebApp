import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import RaisedButton from 'material-ui/RaisedButton';

import { onAuthChange } from '../../../routes/routes';
import { login, logout } from '../../actions/setLoginState';

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

class renderLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  async showResults() {
    await sleep(500);
    console.log('showResults', this.props);
    const formValues = this.props.state.form.LoginForm.values;
    const email = formValues.email;
    const password = formValues.password;

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        window.alert(JSON.stringify(err, null, 2));
      } else {
        onAuthChange.authenticate();
        this.props.login();
      }
    });
  }
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { state } = this.props;

    if (state.loginReducer.Logged) {
      return (
        <Redirect to="/Home" />
      );
    }

    console.log('LoginState', Meteor.userId());
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
                <form onSubmit={handleSubmit(() => { this.showResults(); })} >
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
  }
}
function mapStateToProps(state) {
  console.log('state', state);
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // showLoginModal: (isShowing) => { dispatch(showLoginModal(isShowing)); },
    login: (value) => { dispatch(login(value)); },
    // hideLeftDrawer: () => { dispatch(logout()); },
  };
}
renderLogin.propTypes = {
  // showLoginModal: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  state: PropTypes.object,
};
InitializeFromStateForm = reduxForm({
  form: 'LoginForm',
})(renderLogin);
export default connect(mapStateToProps, mapDispatchToProps)(InitializeFromStateForm);
