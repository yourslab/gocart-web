import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {updateUser} from 'app/modules/auth';
import EditProfileForm from './components/EditProfileForm';

class AppManagePostsCreateView extends Component {
  state = {
    loading: false,
    errors: {}
  };

  render() {
    return (
      <div>
        <Helmet title="Profile Settings" />

        <EditProfileForm
          auth={this.props.auth} 
          state={this.state}
          onPost={this.handlePost} />
      </div>
    );
  }

  handlePost = (data) => {
    const {auth, updateUser} = this.props;
    
    if ( this.state.loading ) {
      return;
    }


    this.setState({
      loading: true,
      error: false
    });
    
    this.props.updateUser(auth.id, data);

    this.setState({
      loading: false
    });
  }
}

const mapState = state => ({
  auth: state.auth.user
});

const mapActions = dispatch => bindActionCreators({ updateUser }, dispatch);

export default connect(mapState, mapActions)(AppManagePostsCreateView);
