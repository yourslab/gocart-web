import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';

export default class AppMeView extends Component {
  render() {
    return (
      <div className="Container">
        <div className="SidebarContainer">
          <div className="Sidebar">
            <IndexLink to="/me" className="Sidebar-item" activeClassName="Sidebar-item--active">Profile</IndexLink>
            <Link to="/me/password" className="Sidebar-item" activeClassName="Sidebar-item--active">Change Password</Link>
            {/*<a href="#" className="Sidebar-item">Billing</a>
            <a href="#" className="Sidebar-item">Orders</a>
            <Link to="/me/settings" className="Sidebar-item" activeClassName="Sidebar-item--active">Privacy</Link>
            <a href="#" className="Sidebar-item">Settings</a>*/}
          </div>

          <div className="SidebarContainer-panel">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
