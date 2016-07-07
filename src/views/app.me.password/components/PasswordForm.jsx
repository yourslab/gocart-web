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
    password_confirmation: ''
  };

  render() {
    const {auth, loading, error, errors, message} = this.props;

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
              error={errors.old_password}
              valueLink={linkState(this, 'old_password')} />
          </div>

          <div className="FormGroup">
            <label htmlFor="password">New Password</label>
            <InputError
              element={<ViewablePasswordInput id="password" valueLink={linkState(this, 'password')} />}
              error={errors.password} />
          </div>

          <div className="FormGroup">
            <label htmlFor="password_confirmation">Confirm New Password</label>
            <InputError
              element={<ViewablePasswordInput id="password_confirmation" valueLink={linkState(this, 'password_confirmation')} />}
              error={errors.password_confirmation} />
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
