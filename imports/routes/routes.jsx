import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom';

import App from '../client/components/App';

export const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
);
