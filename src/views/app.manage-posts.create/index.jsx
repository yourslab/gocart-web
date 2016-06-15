import React, {Component} from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import lang from 'app/lang';
import history from 'app/history';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import CreatePostForm from './components/CreatePostForm';

class AppManagePostsCreateView extends Component {
  state = {
    loading: false,
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
          onPreview={null}
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
      errors: {},
      message: ''
    });

    return axios.post('/post', data)
      .then((res) => {
        this.setState({ loading: false });
        history.push(`/post/${res.data.id}`)
        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
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
