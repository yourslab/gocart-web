import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';

export default class AppManagePostsView extends Component {
  render() {
    return (
      <div className="Container">
        <div className="SidebarContainer">
          <div className="Sidebar">
            <IndexLink to="/manage-posts" className="Sidebar-item" activeClassName="Sidebar-item--active">Manage Posts</IndexLink>
            <Link to="/manage-posts/create" className="Sidebar-item" activeClassName="Sidebar-item--active">Create Post</Link>
            {/*<Link to="/manage-posts/archived" className="Sidebar-item" activeClassName="Sidebar-item--active">Archived Posts</Link>*/}
          </div>

          <div className="SidebarContainer-panel">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
