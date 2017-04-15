import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from '../imports/client/components/App';

injectTapEventPlugin();

Meteor.startup(function () {
  render((
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>

    ), document.getElementById('render-target'));
});
