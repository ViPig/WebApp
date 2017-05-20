import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

import App from '../client/components/App';
import Login from '../client/components/Accounts/Login';
import SignUp from '../client/components/Accounts/SignUp';
import Store from '../client/store/store';


export const onAuthChange = {
  // Magical
  isAuthenticated: Meteor.userId(),
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export default Routes = () => {
  return (
    <Router>
      <div>
        <Route
          exact path="/" render={props => (
            onAuthChange.isAuthenticated ? (<Redirect to="/Home" />) : (<Login />)
          )}
        />
        <Route
          path="/Login" render={props => (
            onAuthChange.isAuthenticated ? (<Redirect to="/Home" />) : (<Login />)
          )}
        />
        <Route
          path="/SignUp" render={props => (
            onAuthChange.isAuthenticated ? (<Redirect to="/Home" />) : (<SignUp />)
          )}
        />
        <Route
          path="/Home" render={props => (
            !onAuthChange.isAuthenticated ? (<Redirect to="/Login" />) : (<App />)
          )}
        />
      </div>
    </Router>
  );
};
