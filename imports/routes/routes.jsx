import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

import App from '../client/components/App';
import FileInfo from '../client/components/Details/FileInfoContainer';
import HomeScreen from '../client/components/Home';
import Login from '../client/components/Accounts/Login';
import SignUp from '../client/components/Accounts/SignUp';
import Status from '../client/components/ServerStaus/StatusContainer';
import Submissions from '../client/components/Submissions/SubmissionsContainer';

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
    <div>
      <Switch>
        <Route
          exact path="/" component={HomeScreen}

        />
        <Route
          path="/Login" render={props => (
            (<Login />)
          )}
        />
        <Route
          path="/SignUp" render={props => (
            (<SignUp />)
          )}
        />
        <Route
          path="/Status" component={Status}
        />
        <Route
          path="/Home" component={HomeScreen}
        />
        <Route
          path="/Submissions" component={Submissions}
        />
        <Route
          path="/Detail/:id"
          component={FileInfo}
        />
        <Route
          path="*"
          component={() => (
            <div>
              <h3>No match for <code>{location.pathname}</code></h3>
            </div>
          )}
        />
      </Switch>
    </div>

  );
};
