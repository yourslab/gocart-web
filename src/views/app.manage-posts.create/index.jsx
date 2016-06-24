import React, {Component} from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import lang from 'app/lang';
import history from 'app/history';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import CreatePostForm from './components/CreatePostForm';
import SuccessDialogue from './components/SuccessDialogue';

class AppManagePostsCreateView extends Component {
  state = {
    loading: false,
    success: false,
    id: '',
    errors: {},
    message: ''
  };

  render() {
    return (
      <div>
        <Helmet title="Create Post" />

        <CreatePostForm
          state={this.state}
          auth={this.props.auth}
          onPost={this.handlePost} />

        <SuccessDialogue
          id={this.state.id}
          success={this.state.success} />
      </div>
    );
  }

  handlePost = (data) => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      errors: {},
      message: ''
    });

    return axios.post('/post', {
        ...data,
        user_id: this.props.auth.id
      })
      .then((res) => {
        this.setState({
          id: res.data.id,
          loading: false,
          success: true
        });

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
            id: res.data.id,
            loading: false,
            message: lang.errors.server
          })
        } else {
          this.setState({
            loading: false,
            errors: formatValidationErrors(res.data.errors)
          });
        }

        return Promise.reject(res);
      });
  }
}

export default connect((state) => ({ auth: state.auth.user }))(AppManagePostsCreateView);
