import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Store from '../imports/client/store/store';
import App from '../imports/client/components/App';

injectTapEventPlugin();

Meteor.startup(function () {
  render((
    <Provider store={Store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>

    ), document.getElementById('render-target'));
});
