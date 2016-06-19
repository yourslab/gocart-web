import React, {Component} from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';
import EditProfileForm from './components/EditProfileForm';

export default class AppManagePostsCreateView extends Component {
  state = {
    loading: false,
    errors: {}
  };

  render() {
    return (
      <div>
        <Helmet title="Profile Settings" />

        <EditProfileForm 
          state={this.state}
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

    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1500);
  }
}
