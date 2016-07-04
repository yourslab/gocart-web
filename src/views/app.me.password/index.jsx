import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import axios from 'axios';
import PasswordForm from './components/PasswordForm';

class AppMePasswordView extends Component {
  state = {
    loading: false,
    error: false,
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
      loading: false,
      error: false
    });
  }
}

const mapState = (state) => ({
  auth: state.auth.user
});

export default connect(mapState)(AppMePasswordView);
