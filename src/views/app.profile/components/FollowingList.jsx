import React, {Component} from 'react';
import {Link} from 'react-router';

export default class FollowingList extends Component {
	state = {
		action: false
	};

	render() {
		return (
			<div className="UserListGroup">
		 		<div className="UserListGroup-heading"> 
		 			<h1> Following </h1>  
		 		</div>

		 		<div className="UserListGroup-body">
		 			<div className="UserListGroup-item">
		 				<img className="UserListGroup-image" src="https://placeimg.com/50/50/people" />
		 				<div className="UserListGroup-details">
		 					<h5 className="UserListGroup-name"> John Doe </h5>
		 					<h6 className="UserListGroup-followers"> 6969 followers </h6>
		 				</div>
		 				<div className="UserListGroup-actions">
			 				<button className="Btn Btn--info"> Following </button>
		 				</div>
		 			</div>

		 			<div className="UserListGroup-item">
		 				<img className="UserListGroup-image" src="https://placeimg.com/50/50/people" />
		 				<div className="UserListGroup-details">
		 					<h5 className="UserListGroup-name"> John Doe </h5>
		 					<h6 className="UserListGroup-followers"> 6969 followers </h6>
		 				</div>
		 				<div className="UserListGroup-actions"> 
		 					<button className="Btn Btn--info"> Following </button>
		 				</div>
		 			</div>

		 			<div className="UserListGroup-item">
		 				<img className="UserListGroup-image" src="https://placeimg.com/50/50/people" />
		 				<div className="UserListGroup-details">
		 					<h5 className="UserListGroup-name"> John Doe </h5>
		 					<h6 className="UserListGroup-followers"> 6969 followers </h6>
		 				</div>
		 				<div className="UserListGroup-actions">
			 				<button className="Btn Btn--info"> Following </button>
		 				</div>
		 			</div>

		 			<div className="UserListGroup-item">
		 				<img className="UserListGroup-image" src="https://placeimg.com/50/50/people" />
		 				<div className="UserListGroup-details">
		 					<h5 className="UserListGroup-name"> John Doe </h5>
		 					<h6 className="UserListGroup-followers"> 6969 followers </h6>
		 				</div>
		 				<div className="UserListGroup-actions">
			 				<button className="Btn Btn--info"> Following </button>
		 				</div>
		 			</div>
		 		</div>

		 		<div className="UserListGroup-footer">
		 			<button onClick={this.onCloseModal} className="Btn Btn--info Btn--block">
		 				Done 
		 			</button>
		 		</div>
		 	</div>
		);
	}

	onMouseEnterHandler = () => {
		this.setState({ action: true });
	}

	onMouseLeaveHandler = () => {
		this.setState({ action: false });
	}

	onCloseModal = () => {
		this.props.closeModal();
	}
}
