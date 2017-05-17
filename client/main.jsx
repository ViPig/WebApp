import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../imports/startup/SimpleSchema';
import Routes, { onAuthChange } from '../imports/routes/routes';
import Store from '../imports/client/store/store';
import App from '../imports/client/components/App';

injectTapEventPlugin();

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(function () {
  render((
    <Provider store={Store}>
      <MuiThemeProvider>
        <Routes />
      </MuiThemeProvider>
    </Provider>

    ), document.getElementById('render-target'));
});
