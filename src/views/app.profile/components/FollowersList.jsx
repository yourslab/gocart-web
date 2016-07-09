import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import qs from 'qs';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import Infinite from 'app/components/Infinite';
import UserFollowWidget from 'app/components/UserFollowWidget';
import UserImg from 'app/components/UserImg';

export default class FollowersList extends Component {
	state = {
		followers: [],
		loading: false,
		error: false,
    last: false,
    offset: 0
	};

  componentDidMount() {
    this.handleRequest();
  }

	render() {
		return (
			<div className="UserListGroup">
		 		<div className="UserListGroup-heading">
		 			<h1> Followers </h1>
		 		</div>

	 			<Infinite
	 				callback={this.handleRequest}
	 				className="UserListGroup-body"
	 				container>
	 				{this.state.followers.map((user, i) =>
	 					<div className="UserListGroup-item" key={i}>
              <Link to={`/@${user.username}`} className="UserListGroup-itemLink">
  			 				<UserImg src={user.prof_pic_link} username={user.username} className="UserListGroup-image" alt={`${user.username}'s Avatar`} />

                <div className="UserListGroup-details">
  			 					<h5 className="UserListGroup-name"> {user.name} </h5>
  			 					<h6 className="UserListGroup-followers">{user.num_followers} followers </h6>
  			 				</div>
              </Link>

			 				<div className="UserListGroup-actions">
                <UserFollowWidget
                  user={{ id: user.from_user, is_followed: user.is_followed }}
                  onFollow={this.handleFollow} />
			 				</div>
				 		</div>
	 				)}
	 			</Infinite>


	 			{this.state.loading
          ? <div className="UserListGroup-loader">
              <div className="Spinner" />
            </div>
          : null}

		 		<div className="UserListGroup-footer">
		 			<button onClick={this.props.onClose} className="Btn Btn--info Btn--block">
		 				Done
		 			</button>
		 		</div>
		 	</div>
		);
	}

	handleRequest = (offset = this.state.offset) => {
    const {state, props} = this;

    if ( state.loading || state.last ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    const query = qs.stringify({
      viewer_id: props.auth.id,
      start: offset,
      end: offset + 19
    });

    return axios.get(`/user/${props.user.id}/followers/?${query}`)
      .then((res) => {
        this.setState({
          followers: offset === 0
            ? res.data
            : [...state.followers, ...res.data],
          loading: false,
          error: false,
          offset: offset + 20
        });

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
            last: res.data.status == 404
          });
        }

        return Promise.reject(res);
      });
  }

  handleFollow = (id) => {
    this.setState((state) => ({
      followers: state.followers.map((user) => user.from_user === id
        ? {
          ...user,
          is_followed: !user.is_followed
        } : user
      )
    }));
  }
}
