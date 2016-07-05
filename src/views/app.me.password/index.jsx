import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import axios from 'axios';
import history from 'app/history';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import PasswordForm from './components/PasswordForm';

class AppMePasswordView extends Component {
  state = {
    loading: false,
    error: false,
    errors: {},
    message: ''
  };

  render() {
    return (
      <div>
        <Helmet title="Change Password" />

        <PasswordForm
          auth={this.props.auth}
          loading={this.state.loading}
          error={this.state.error}
          message={this.state.message}
          onPost={this.handlePost} />
      </div>
    );
  }

  handlePost = (data) => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    if ( data.new_password_confirmation !== data.new_password ) {
      this.setState({
        errors: {
          new_password_confirmation: 'Your password does not match'
        }
      });
    } else {
      return axios.put(`/user/${this.props.auth.id}`, data)
        .then((res) => {
          this.setState({
            loading: true,
          });

          history.push(`/@${this.props.auth.username}`);

          return res;
        })
        .catch((res) => {
          if ( isServerError(res.status) ) {
            this.setState({
              loading: false,
              message: lang.errors.server
            });
          } else {
            this.setState({
              loading: false,
              errors: res.data.errors,
              message: lang.errors.input
            });
          }
        })
    }
  }
}

const mapState = (state) => ({
  auth: state.auth.user
});

export default connect(mapState)(AppMePasswordView);
