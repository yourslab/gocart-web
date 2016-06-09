import React, {Component} from 'react';
import {Link} from 'react-router';

export default class FollowersList extends Component {
	render() {
		return (
			<div className="ModalListPanel">
		 		<div className="ModalListPanel-heading"> 
		 			<h1> Followers </h1>  
		 		</div>

		 		<div className="ModalListPanel-body">
		 			<div className="ModalListPanel-item">
		 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
		 				<div className="ModalListPanel-details">
		 					<h5 className="ModalListPanel-name"> John Doe </h5>
		 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
		 				</div>
		 				<div className="ModalListPanel-actions">
		 					<button className="Btn Btn--info Btn--inverted"> Follow </button>
		 				</div>
		 			</div>

		 			<div className="ModalListPanel-item">
		 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
		 				<div className="ModalListPanel-details">
		 					<h5 className="ModalListPanel-name"> John Doe </h5>
		 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
		 				</div>
		 				<div className="ModalListPanel-actions">
		 					<button className="Btn Btn--info Btn--inverted"> Follow </button>
		 				</div>
		 			</div>

		 			<div className="ModalListPanel-item">
		 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
		 				<div className="ModalListPanel-details">
		 					<h5 className="ModalListPanel-name"> John Doe </h5>
		 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
		 				</div>
		 				<div className="ModalListPanel-actions">
		 					<button className="Btn Btn--info"> Following </button>
		 				</div>
		 			</div>

		 			<div className="ModalListPanel-item">
		 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
		 				<div className="ModalListPanel-details">
		 					<h5 className="ModalListPanel-name"> John Doe </h5>
		 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
		 				</div>
		 				<div className="ModalListPanel-actions">
		 					<button className="Btn Btn--info"> Following </button>
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

	onCloseModal = () => {
		this.props.closeModal();
	}
}
