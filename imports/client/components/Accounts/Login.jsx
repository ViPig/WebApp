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
import Typography from 'material-ui/Typography';
import InputLabel from 'material-ui/Input/InputLabel';
import i18n from 'meteor/universe:i18n';

// import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import { onAuthChange } from '../../../routes/routes';
import { login, logout } from '../../actions/setLoginState';

const T = i18n.createComponent(i18n.createTranslator());

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
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
      message: null,
    };
  }
  handleClick = (message) => {
    this.setState({ open: true, message: message });
  };
  handleRequestClose = () => {
    this.setState({ open: false });
  };
  async showResults() {
    await sleep(500);
    const formValues = this.props.state.form.LoginForm.values;
    const email = formValues.email;
    const password = formValues.password;

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.handleClick(JSON.stringify(err.reason, null, 2));
      } else {
        onAuthChange.authenticate();
        this.props.login();
      }
    });
  }
  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { vertical, horizontal, open, message } = this.state;

    const { state } = this.props;
    const classes = this.props.classes;
    if (Meteor.userId()) {
      return (
        <Redirect to="/Home" />
      );
    }

    return (
      <div className="login_page">
        <div data-reactroot>
          <div className="login_page_paper">
            <div>
              <Paper>
                <Paper style={style_1} >
                  {/* <ActionAccountCircle color="#EEEEEE" style={largeIcon} className="login_page_icon" /> */}
                </Paper>
                <Divider />
                <form onSubmit={handleSubmit(() => { this.showResults(); })} >
                  <div className="login_page_form">
                    <Grid fluid>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <InputLabel htmlFor="email"><T>email</T></InputLabel>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            fullWidth
                            component={renderTextField}
                            label="Email"
                            className={classes.textField}
                            disableUnderline
                          />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <InputLabel htmlFor="password"><T>password</T></InputLabel>
                          <Field
                            name="password"
                            id="password"
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
                            <T>login</T>
                          </Button>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <div className="login_page_register">
                            <Link to="/SignUp" ><Typography type="button" gutterBottom>
                              <T>signup_guide</T>
                            </Typography></Link>
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
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
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
