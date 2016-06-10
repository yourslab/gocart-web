import React, {Component} from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';
import StaticImg from 'app/components/StaticImg';

export default class Modal extends Component {
	state = {
		open: false
	};

	render() {
		const {size} = this.props;

		return (
			<ReactModal
				isOpen={this.state.open}
				onRequestClose={this.onClose}
				className={cn({'ReactModal__Content-small': size === 'sm'}, {'ReactModal__Content-large': size === 'lg'})}>
				<div className="ReactModal__closeButton"> 
					<button onClick={this.onClose} className="PlainBtn">
						<StaticImg src="icons/close_white@1x.png" />
					</button>
				</div>
				{this.props.children}
			</ReactModal>
		);
	}

	show = () => {
		this.setState({ open: true });
	}

	onClose = () => {
		this.setState({ open: false })
	}
}