import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import qs from 'qs';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import Infinite from 'app/components/Infinite';

export default class FollowersList extends Component {
	state = {
		followers: [],
		loading: false,
		error: false,
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
			 				<img className="UserListGroup-image" src="https://placeimg.com/50/50/people" />
			 				<div className="UserListGroup-details">
			 					<h5 className="UserListGroup-name"> John Doe </h5>
			 					<h6 className="UserListGroup-followers"> 6969 followers </h6>
			 				</div>
			 				<div className="UserListGroup-actions">
			 					<button className="Btn Btn--info Btn--inverted"> Follow </button>
			 				</div>
				 		</div>
	 				)}
	 			</Infinite>
	 			{this.state.loading ? <div className="Spinner" /> : null }

		 		<div className="UserListGroup-footer">
		 			<button onClick={this.props.onClose} className="Btn Btn--info Btn--block">
		 				Done
		 			</button>
		 		</div>
		 	</div>
		);
	}

	handleRequest = (offset = this.state.offset) => {
    if ( this.state.loading ) {
      return;
    }

    const {auth, user} = this.props;

    this.setState({
      loading: true,
      error: false
    });

    const query = qs.stringify({
      to_id: user.id === auth.id ? '' : user.id,
      start: offset,
      end: offset + 5
    });

    return axios.get(`/user/${auth.id}/followers/?${query}`)
      .then((res) => {
        this.setState({
          followers: res.data,
          loading: false,
          error: false,
          offset: offset + 5
        });

        return res;
      })
      .catch((res) => {
        this.setState({
          loading: false,
          error: true,
          errors: formatValidationErrors(res.data.errors)
        });

        return Promise.reject(res);
      });
  }
}
