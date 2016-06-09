import React from 'react';
import {Route, IndexRoute} from 'react-router';
import MainView from './views/main';
import AppView from './views/app';
import AppHomeView from './views/app.home';
import AppSearchView from './views/app.search';
import AppProfileView from './views/app.profile';
import AppProfileFollowersView from './views/app.profile.followers';
import AppProductView from './views/app.product';
import AppManagePostsView from './views/app.manage-posts';
import AppManagePostsHomeView from './views/app.manage-posts.home';
import AppManagePostsCreateView from './views/app.manage-posts.create';
import AppManagePostsArchivedView from './views/app.manage-posts.archived';
import AppMeView from './views/app.me';
import AppMeHomeView from './views/app.me.home';
import AppMePasswordView from './views/app.me.password';
import AppMePrivacyView from './views/app.me.privacy';
import LoginView from './views/login';
import RegistrationView from './views/registration';

export default (
  <Route path="/" component={MainView}>
    <Route component={AppView}>
      <IndexRoute component={AppHomeView} />
      <Route path="search" component={AppSearchView} />
      <Route path="@:user" component={AppProfileView}>
        <Route path="followers" component={AppProfileFollowersView} />
      </Route>
      <Route path="/products/:slug" component={AppProductView} />

      <Route path="manage-posts" component={AppManagePostsView}>
        <IndexRoute component={AppManagePostsHomeView} />
        <Route path="create" component={AppManagePostsCreateView} />
        <Route path="archived" component={AppManagePostsArchivedView} />
      </Route>

      <Route path="me" component={AppMeView}>
        <IndexRoute component={AppMeHomeView} />
        <Route path="password" component={AppMePasswordView} />
        <Route path="privacy" component={AppMePrivacyView} />
      </Route>
    </Route>

    <Route path="login" component={LoginView} />
    <Route path="registration" component={RegistrationView} />
  </Route>
);
