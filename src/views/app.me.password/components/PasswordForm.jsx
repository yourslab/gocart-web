import React, {Component} from 'react';
import linkState from 'react-link-state';
import {Link} from 'react-router';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import ViewablePasswordInput from 'app/components/ViewablePasswordInput';
import ButtonLoader from 'app/components/ButtonLoader';
import InputError from 'app/components/InputError';

export default class PasswordForm extends Component {
  state = {
    old_password: '',
    password: '',
    new_password_confirmation: ''
  };

  render() {
    const {auth, loading, error, message} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="SidebarContainer-panelHeading">
          <div className="SidebarContainer-panelHeadingSection" />

          <div className="SidebarContainer-panelHeadingSection">
            <div className="SidebarContainer-panelHeadingSectionItem">
              <Link to={`/@${auth.username}`} className="Btn Btn--default">
                Cancel
              </Link>
            </div>

            <div className="SidebarContainer-panelHeadingSectionItem">
              <ButtonLoader className="Btn Btn--info" loading={loading}>
                Save
              </ButtonLoader>
            </div>
          </div>
        </div>

        <div className="u-size4">
          <div className="FormGroup">
            <label htmlFor="password">Old Password</label>
            <InputError
              type="password"
              id="password"
              className="FormInput"
              error={message.old_password}
              valueLink={linkState(this, 'password')} />
          </div>

          <div className="FormGroup">
            <label htmlFor="new_password">New Password</label>
            <InputError
              element={<ViewablePasswordInput id="new_password" valueLink={linkState(this, 'new_password')} />}
              error={message.new_password} />
          </div>

          <div className="FormGroup">
            <label htmlFor="new_password_confirmation">Confirm New Password</label>
            <InputError
              element={<ViewablePasswordInput id="new_password_confirmation" valueLink={linkState(this, 'new_password_confirmation')} />}
              error={message.new_password_confirmation} />
          </div>
        </div>
      </form>
    );
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.props.onPost(this.state);
  }
}
