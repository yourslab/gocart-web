import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {update} from 'app/modules/auth';
import removeBase64Prefix from 'app/utils/removeBase64Prefix';
import EditProfileForm from './components/EditProfileForm';

class AppManagePostsCreateView extends Component {
  render() {
    const {auth, errors, error, loading} = this.props;

    return (
      <div>
        <Helmet title="Profile Settings" />

        <EditProfileForm
          auth={auth}
          loading={loading}
          error={error}
          errors={errors}
          onPost={this.handlePost} />
      </div>
    );
  }

  handlePost = (data) => {
    this.props.actions.update({
      prof_pic_link: removeBase64Prefix(data.prof_pic_link),
      name: data.name,
      about: data.about
    });
  }
}

const mapState = state => ({
  auth: state.auth.user,
  loading: state.auth.update.loading,
  error: state.auth.update.error,
  errors: state.auth.update.errors
});

const mapActions = (dispatch) => ({
  actions: bindActionCreators({ update }, dispatch)
})
export default connect(mapState, mapActions)(AppManagePostsCreateView);
