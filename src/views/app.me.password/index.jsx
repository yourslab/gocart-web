import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import axios from 'axios';
import lang from 'app/lang';
import history from 'app/history';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import PasswordForm from './components/PasswordForm';

class AppMePasswordView extends Component {
  state = {
    loading: false,
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
          errors={this.state.errors}
          message={this.state.message}
          onPost={this.handlePost} />
      </div>
    );
  }

  handlePost = (data) => {
    if ( this.state.loading ) {
      return;
    }

    if ( data.password !== data.password_confirmation ) {
      this.setState({
        errors: {
          password_confirmation: lang.errors.password
        }
      });

      return;
    }

    this.setState({
      loading: true,
      errors: {},
      message: ''
    });

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
            errors: formatValidationErrors(res.data.errors),
            message: lang.errors.input
          });
        }
      });
  }
}

const mapState = (state) => ({
  auth: state.auth.user
});

export default connect(mapState)(AppMePasswordView);
