import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import qs from 'qs';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import Infinite from 'app/components/Infinite';

export default class FollowingList extends Component {
	state = {
		following: [],
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
		 			<h1> Following </h1>
		 		</div>

		 		<Infinite
	 				callback={this.handleRequest}
	 				className="UserListGroup-body"
	 				container>
	 				{this.state.following.map((user, i) =>
	 					<div className="UserListGroup-item" key={i}>
			 				<img className="UserListGroup-image" src="https://placeimg.com/50/50/people" />
			 				<div className="UserListGroup-details">
			 					<h5 className="UserListGroup-name"> {user.name} </h5>
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
    const {state, props} = this;

    if ( state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    const query = qs.stringify({
      to_id: props.user.id === props.auth.id ? '' : props.user.id,
      start: offset === 0 ? offset : offset + 1,
      end: offset + 5
    });

    return axios.get(`/user/${props.auth.id}/following/?${query}`)
      .then((res) => {
        this.setState({
          following: offset === 0
            ? res.data
            : [...state.following, ...res.data],
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
        console.log(res);

        return Promise.reject(res);
      });

  }
}
