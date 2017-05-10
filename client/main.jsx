import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { routes } from '../imports/routes/routes';
import Store from '../imports/client/store/store';
import App from '../imports/client/components/App';
import Login from '../imports/client/components/Accounts/Login';
import SignUp from '../imports/client/components/Accounts/SignUp';

injectTapEventPlugin();

Meteor.startup(function () {
  render((
    <Provider store={Store}>
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>

    ), document.getElementById('render-target'));
});
