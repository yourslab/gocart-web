import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ViewablePasswordInput from 'app/components/ViewablePasswordInput';

export default class AppMePasswordView extends Component {
  render() {
    return (
      <div>
        <Helmet title="Change Password" />

        <div className="SidebarContainer-panelHeading">
          <div className="SidebarContainer-panelHeadingSection">
            <div className="SidebarContainer-panelHeadingSectionItem">
              <h1>Change Password</h1>
            </div>
          </div>
        </div>

        <div className="u-size4">
          <div className="FormGroup">
            <label htmlFor="password">Old Password</label>
            <input type="password" id="password" className="FormInput" />
          </div>

          <div className="FormGroup">
            <label htmlFor="new_password">New Password</label>
            <ViewablePasswordInput id="new_password" />
          </div>

          <div className="FormGroup">
            <label htmlFor="new_password_confirmation">Confirm New Password</label>
            <ViewablePasswordInput id="new_password_confirmation" />
          </div>
        </div>
      </div>
    );
  }
}
