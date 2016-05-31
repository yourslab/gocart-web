import React from 'react';
import {Route, IndexRoute} from 'react-router';
import MainView from './views/main';
import AppView from './views/app';
import AppHomeView from './views/app.home';
import LoginView from './views/login';
import RegistrationView from './views/registration';

export default (
  <Route path="/" component={MainView}>
    <Route component={AppView}>
      <IndexRoute component={AppHomeView} />
    </Route>

    <Route path="login" component={LoginView} />
    <Route path="registration" component={RegistrationView} />
  </Route>
);
