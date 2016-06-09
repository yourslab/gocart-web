import React, {Component} from 'react';
import Skylight from 'react-skylight';
import {Link} from 'react-router';
import history from 'app/history';

export default class AppProfileFollowersView extends Component {
	componentDidMount() {
		this.refs.dialogue.show();
	}

	componentWillUnmount() {
		this.refs.dialogue.hide();
	}

	render() {
		return (
			<Skylight
			 	ref="dialogue"
			 	dialogStyles={{ height: 'auto', width: '35%', left: '55%' }}
			 	afterClose={() => history.push('/@srph')}>
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
			 			<button className="Btn Btn--info Btn--block">
			 				Done 
			 			</button>
			 		</div>
			 	</div>
			</Skylight>
		);
	}
}