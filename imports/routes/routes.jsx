import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

import App from '../client/components/App';
import Login from '../client/components/Accounts/Login';
import SignUp from '../client/components/Accounts/SignUp';

const userId = Meteor.userId();

export const onAuthChange = (isAuthenticated) => {
  withRouter(({ match, location, history }) => {
    console.log(action, location.pathname, location.state);
    return false;
  });
};

export default Routes = () => {
  return (
    <Router>
      <div>
        <Route
          exact path="/" render={() => (
            userId ? (<Redirect to="/Home" />) : (<Login />)
          )}
        />
        <Route
          path="/Login" render={() => (
            userId ? (<Redirect to="/Home" />) : (<Login />)
          )}
        />
        <Route
          path="/SignUp" render={() => (
            userId ? (<Redirect to="/Home" />) : (<SignUp />)
          )}
        />
        <Route
          path="/Home" render={() => (
            !userId ? (<Redirect to="/Login" />) : (<App />)
          )}
        />
      </div>
    </Router>
  );
};
