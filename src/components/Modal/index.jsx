import React, {Component} from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';

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