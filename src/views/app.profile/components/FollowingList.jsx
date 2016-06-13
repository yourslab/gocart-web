import React, {Component} from 'react';
import {Link} from 'react-router';
import Infinite from 'app/components/Infinite';

export default class FollowingList extends Component {
	state = {
		following: [{}, {}, {}, {}, {}, {}],
		loading: false,
		error: false
	};

	render() {
		return (
			<div className="UserListGroup">
		 		<div className="UserListGroup-heading">
		 			<h1> Following </h1>
		 		</div>

		 		<Infinite callback={this.handleRequest} className="UserListGroup-body" container>
	 				{this.state.following.map((followed, i) =>
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
	 			{this.state.loading ? <div className="Spinner u-spacer-small" /> : null }

		 		<div className="UserListGroup-footer">
		 			<button onClick={this.props.onClose} className="Btn Btn--info Btn--block">
		 				Done
		 			</button>
		 		</div>
		 	</div>
		);
	}

	handleRequest = () => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    setTimeout(() => {
      this.setState((state) => ({
        following: [...state.following, {}, {}],
        loading: false
      }));
    }, 1500);
  }
}
