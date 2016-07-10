import React from 'react';
import {Route, IndexRoute} from 'react-router';
import MainView from './views/main';
import AppView from './views/app';
import AppHomeView from './views/app.home';
import AppSearchView from './views/app.search';
import AppSearchPostsView from './views/app.search.posts';
import AppSearchUsersView from './views/app.search.users';
import AppProfileView from './views/app.profile';
import AppProfileHomeView from './views/app.profile.home';
import AppProfileRatingsView from './views/app.profile.ratings';
import AppPostView from './views/app.post';
import AppManagePostsView from './views/app.manage-posts';
import AppManagePostsHomeView from './views/app.manage-posts.home';
import AppManagePostsCreateView from './views/app.manage-posts.create';
import AppManagePostsArchivedView from './views/app.manage-posts.archived';
import AppMeView from './views/app.me';
import AppMessagesView from './views/app.messages';
import AppMessagesHomeView from './views/app.messages.home';
import AppMessagesViewView from './views/app.messages.view';
import AppMeHomeView from './views/app.me.home';
import AppMePasswordView from './views/app.me.password';
import AppMePrivacyView from './views/app.me.privacy';
import LoginView from './views/login';
import LogoutView from './views/logout';
import RegistrationView from './views/registration';
import PinView from './views/pin';

export default (
  <Route path="/" component={MainView}>
    <Route component={AppView}>
      <IndexRoute component={AppHomeView} />

      <Route path="search" component={AppSearchView}>
        <IndexRoute component={AppSearchPostsView} />
        <Route path="users" component={AppSearchUsersView} />
      </Route>

      <Route path="@:user" component={AppProfileView}>
        <IndexRoute component={AppProfileHomeView} />
        <Route path="ratings" component={AppProfileRatingsView} />
      </Route>

      <Route path="/posts/:id" component={AppPostView} />

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

      <Route path="messages" components={AppMessagesView}>
        <IndexRoute components={AppMessagesHomeView} />
        <Route path=":id" components={AppMessagesViewView} />
      </Route>
    </Route>

    <Route path="login" component={LoginView} />
    <Route path="logout" component={LogoutView} />
    <Route path="registration" component={RegistrationView} />
    <Route path="pin" component={PinView} />
  </Route>
);
