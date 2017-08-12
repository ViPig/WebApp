import { Meteor } from 'meteor/meteor';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input/Input';
import Divider from 'material-ui/Divider';
// import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import Button from 'material-ui/Button';

import { onAuthChange } from '../../../routes/routes';
import { login, logout } from '../../actions/setLoginState';

const styleSheet = createStyleSheet(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    borderBottom: 'none !important',
    margin: 'none !important',
    backgroundColor: 'transparent !important',
  },
}));


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

class renderLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  async showResults() {
    await sleep(500);
    // console.log('showResults', this.props);
    const formValues = this.props.state.form.LoginForm.values;
    const email = formValues.email;
    const password = formValues.password;

    Meteor.loginWithPassword({ email }, password, (err) => {
      console.log(email, password);
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
    const classes = this.props.classes;
    if (state.loginReducer.Logged) {
      return (
        <Redirect to="/Home" />
      );
    }

    // console.log('LoginState', Meteor.userId());
    return (
      <div className="login_page">
        <div data-reactroot>
          <div className="login_page_paper">
            <div>
              <Paper style={style} >
                <Paper style={style_1} >
                  {/* <ActionAccountCircle color="#EEEEEE" style={largeIcon} className="login_page_icon" /> */}
                </Paper>
                <Divider />
                <form onSubmit={handleSubmit(() => { this.showResults(); })} >
                  <div className="login_page_form">
                    <Grid fluid>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <Field
                            type="email"
                            name="email"
                            fullWidth
                            component={renderTextField}
                            label="Email"
                            className={classes.textField}
                            disableUnderline
                          />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <Field
                            name="password"
                            fullWidth
                            component={renderTextField}
                            label="Password"
                            type="password"
                            className={classes.textField}
                            disableUnderline
                          />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className="text-center">
                          <Button
                            raised
                            type="submit"
                            disabled={pristine || submitting}
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <div className="login_page_register">
                            <Link to="/SignUp" >Don&apos;t have an account?</Link>
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
  }
}
function mapStateToProps(state) {
  // console.log('state', state);
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(InitializeFromStateForm));
