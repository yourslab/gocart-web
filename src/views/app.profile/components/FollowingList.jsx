import React, {Component} from 'react';
import {Link} from 'react-router';

const FollowingList = () => 
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
 				<button className="Btn Btn--primary"> Unfollow </button>
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

export default FollowingList;