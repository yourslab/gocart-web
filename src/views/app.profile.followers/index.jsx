import React, {Component} from 'react';
import {Link} from 'react-router';
import Modal from 'react-modal';

const dialogStyle = {
	content: {
		width: '35%',
		height: 460,
		overflow: 'visible',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 100,
		boxShadow: '0px 0px 4px rgba(0, 0, 0, .14), 0px 4px 8px rgba(0, 0, 0, .28)',
		zIndex: 100
	},

	overlay: {
		zIndex: 99,
		backgroundColor: 'rgba(0, 0, 0, 0.3)'
	}
};

export default class AppProfileFollowersView extends Component {
	state = {
		open: false
	}

	componentDidMount() {
		this.setState({ open: true });
	}

	componentWillUnmount() {
		this.setState({ open: false });
	}

	render() {
		return (
			<Modal
				isOpen={this.state.open}
				onRequestClose={this.componentWillUnmount}
				style={dialogStyle}>
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
			 				<button className="Btn Btn--info Btn--inverted"> Follow </button>
			 			</div>

			 			<div className="ModalListPanel-item">
			 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
			 				<div className="ModalListPanel-details">
			 					<h5 className="ModalListPanel-name"> John Doe </h5>
			 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
			 				</div>
			 				<button className="Btn Btn--info Btn--inverted"> Follow </button>
			 			</div>

			 			<div className="ModalListPanel-item">
			 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
			 				<div className="ModalListPanel-details">
			 					<h5 className="ModalListPanel-name"> John Doe </h5>
			 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
			 				</div>
			 				<button className="Btn Btn--info"> Following </button>
			 			</div>

			 			<div className="ModalListPanel-item">
			 				<img className="ModalListPanel-image" src="https://placeimg.com/50/50/people" />
			 				<div className="ModalListPanel-details">
			 					<h5 className="ModalListPanel-name"> John Doe </h5>
			 					<h6 className="ModalListPanel-followers"> 6969 followers </h6>
			 				</div>
			 				<button className="Btn Btn--info"> Following </button>
			 			</div>
			 		</div>

			 		<div className="ModalListPanel-actions">
			 			<Link to="/@srph" className="Btn Btn--info Btn--block">
			 				Done 
			 			</Link>
			 		</div>
			 	</div>
			</Modal>
		);
	}

	onCloseModal = () => {
		this.setState({ open: false });
	}
}