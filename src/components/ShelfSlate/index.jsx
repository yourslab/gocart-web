import React, {Component} from 'react';
import StaticImg from 'app/components/StaticImg';
import {Link} from 'react-router';

export default class ShelfSlate extends Component {
	render() {
		return (
			<Link to="manage-posts/create" className="ShelfSlate">
				<div className="u-text-center">
					<StaticImg src="icons/post_icon@1x.png" className="u-spacer-small" />
					<h2 className="ShelfSlate-heading"> Add Shelf </h2>
				</div>
			</Link>
		);
	}
}