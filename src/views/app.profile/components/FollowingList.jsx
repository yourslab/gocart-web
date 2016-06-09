import React, {Component} from 'react';
import {Link} from 'react-router';

export default class FollowingList extends Component {
	state = {
		action: false
	};

	render() {
		return (
			<div className="ModalListPanel">
		 		<div className="ModalListPanel-heading"> 
		 			<h1> Following </h1>  
		 		</div>

		 		<div className="ModalListPanel-body">
		 			<div className="ModalListPanel-item">
		 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
		 				<div className="ModalListPanel-details">
		 					<h5 className="ModalListPanel-name"> John Doe </h5>
		 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
		 				</div>
		 				<div 
		 					onMouseEnter={this.onMouseEnterHandler}
		 					onMouseLeave={this.onMouseLeaveHandler}
		 					className="ModalListPanel-actions">
			 				{this.state.action 
			 					? <button className="Btn Btn--primary"> Unfollow </button>
			 					: <button className="Btn Btn--info"> Following </button>
			 				}
		 				</div>
		 			</div>

		 			<div className="ModalListPanel-item">
		 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
		 				<div className="ModalListPanel-details">
		 					<h5 className="ModalListPanel-name"> John Doe </h5>
		 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
		 				</div>
		 				<div 
		 					onMouseEnter={this.onMouseEnterHandler}
		 					onMouseLeave={this.onMouseLeaveHandler}
		 					className="ModalListPanel-actions">
			 				{this.state.action 
			 					? <button className="Btn Btn--primary"> Unfollow </button>
			 					: <button className="Btn Btn--info"> Following </button>
			 				}
		 				</div>
		 			</div>

		 			<div className="ModalListPanel-item">
		 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
		 				<div className="ModalListPanel-details">
		 					<h5 className="ModalListPanel-name"> John Doe </h5>
		 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
		 				</div>
		 				<div 
		 					onMouseEnter={this.onMouseEnterHandler}
		 					onMouseLeave={this.onMouseLeaveHandler}
		 					className="ModalListPanel-actions">
			 				{this.state.action 
			 					? <button className="Btn Btn--primary"> Unfollow </button>
			 					: <button className="Btn Btn--info"> Following </button>
			 				}
		 				</div>
		 			</div>

		 			<div className="ModalListPanel-item">
		 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
		 				<div className="ModalListPanel-details">
		 					<h5 className="ModalListPanel-name"> John Doe </h5>
		 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
		 				</div>
		 				<div 
		 					onMouseEnter={this.onMouseEnterHandler}
		 					onMouseLeave={this.onMouseLeaveHandler}
		 					className="ModalListPanel-actions">
			 				{this.state.action 
			 					? <button className="Btn Btn--primary"> Unfollow </button>
			 					: <button className="Btn Btn--info"> Following </button>
			 				}
		 				</div>
		 			</div>
		 		</div>

		 		<div className="ModalListPanel-footer">
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
