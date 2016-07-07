import React, { Component } from 'react';
import cn from 'classnames';
import flowRight from 'lodash/flowRight';
import linkState from 'react-link-state';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {GatewayProvider, GatewayDest} from 'react-gateway';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import defer from 'app/utils/defer';
import history from 'app/history';
import {auth} from 'app/components/Permission';
import StaticImg from 'app/components/StaticImg';
import UserImg from 'app/components/UserImg';
import Permission from 'app/components/Permission';

class AppView extends Component {
  state = {
    left: false,
    right: false,
    search: '',

    notifications: [],
    loading: false,
    last: false,
    error: '',
    offset: 0
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKeydown);
  }

  componentWillReceiveProps() {
    this.handleToggleRightDrawer();
  }

  render() {
    const {left, right, notifications, loading} = this.state;
    const {user} = this.props;

    return (
      <GatewayProvider>
        <div>
          <div className="MainWrapper">
            <div className={cn('MainWrapper-drawer MainWrapper-drawer--left', { 'MainWrapper-drawer--active': left })}>
              <div className="MainDrawer">
                <div className="MainDrawer-body">
                  <div className="MainDrawer-close">
                    <button className="PlainBtn" type="button" onClick={this.handleToggleLeftDrawer}>
                      <StaticImg src="icons/close_black@1x.png" alt="Close" />
                    </button>
                  </div>

                  <div className="MainDrawerSidebar">
                    <a href="#" className="MainDrawerSidebar-link MainDrawerSidebar-link--active">Discover</a>
                    <Link to="/manage-posts/create" className="MainDrawerSidebar-link">Create a post</Link>
                    <div className="MainDrawerSidebar-separator" />
                    <Permission rule="auth"><Link to={`/@${user.username}`} className="MainDrawerSidebar-link">My Profile</Link></Permission>
                    <a href="#" className="MainDrawerSidebar-link">My Cart</a>
                    <a href="#" className="MainDrawerSidebar-link">Payments</a>
                    <a href="#" className="MainDrawerSidebar-link">Billing</a>
                    <a href="#" className="MainDrawerSidebar-link">Reports</a>
                    <Link to="/logout" className="MainDrawerSidebar-link">Logout</Link>
                    <div className="MainDrawerSidebar-separator" />
                    <a href="#" className="MainDrawerSidebar-link">About Us</a>
                    <a href="#" className="MainDrawerSidebar-link">FAQs</a>
                    <a href="#" className="MainDrawerSidebar-link">Help & Support</a>
                  </div>
                </div>

                <div className="MainDrawer-logoSection">
                  <StaticImg src="logo-gray.svg" alt="Logo" className="MainDrawer-logo" />
                </div>
              </div>
            </div>

            <Permission rule="auth">
              <div className={cn('MainWrapper-drawer MainWrapper-drawer--right', { 'MainWrapper-drawer--active': right })}>
                <div className="MainDrawer">
                    <div className="MainDrawer-body">
                      <div className="MainDrawer-close">
                        <button className="PlainBtn" type="button" onClick={this.handleToggleRightDrawer}>
                          <StaticImg src="icons/close_black@1x.png" alt="Close" />
                        </button>
                      </div>

                      {loading
                        ? <div className="Spinner" />
                        : <div className="MainDrawerNotification">
                            <div className="MainDrawerNotification-heading">
                              <h4>Notifications</h4>
                            </div>
                            {notifications.map((notif, i) =>
                              <div key={i} className={cn('MainDrawerNotification-item', { 'MainDrawerNotification-item--unseen': notif.has_been_read })}>
                                <div className="MainDrawerNotification-itemHeading">
                                  <div className="MainDrawerNotification-itemAvatar">
                                    <UserImg src={notif.prof_pic_link} username={notif.username} className="MainDrawerNotification-itemAvatarImage" alt={`${notif.username}'s Avatar`} />
                                  </div>

                                  <div>
                                    <h6 className="MainDrawerNotification-itemName"> {notif.name} </h6>
                                    <h6 className="MainDrawerNotification-itemTime"> {moment.unix(notif.time_created).fromNow()} </h6>
                                  </div>

                                </div>

                                <div className="MainDrawerNotification-itemBody">
                                  <h6 className="MainDrawerNotification-itemAction">Posted a comment</h6>
                                  <h6 className="MainDrawerNotification-itemDetails">Lorem ipsum dolor sit amet...</h6>
                                </div>
                              </div>
                            )}
                        </div>}
                    </div>

                  <div className="MainDrawer-logoSection">
                    <StaticImg src="logo-gray.svg" alt="Logo" className="MainDrawer-logo" />
                  </div>
                </div>
              </div>
            </Permission>

            <div className="MainWrapper-body">
              <div className="MainHeader">
                <div className="MainHeader-sidebar MainHeader-sidebar--left">
                  <button className="PlainBtn" type="button" onClick={this.handleToggleLeftDrawer}>
                    <StaticImg src="icons/drawer_red@1x.png" alt="Drawer Icon" />
                  </button>
                </div>

                <div className="Container">
                  <div className="MainHeader-inner">
                    <div className="MainHeader-section">
                      <div className="MainHeader-sectionItem">
                        <Link to="/" className="MainHeader-logoLink">
                          <StaticImg src="logo.svg" alt="logo" className="MainHeader-logo" />
                        </Link>
                      </div>

                      <div className="MainHeader-sectionItem">
                        <Link to="/" className="MainHeader-link MainHeader-link--active">Popular</Link>
                      </div>

                      <div className="MainHeader-sectionItem">
                        <Link to="/" className="MainHeader-link">Recent</Link>
                      </div>

                      <div className="MainHeader-sectionItem">
                        <Link to="/" className="MainHeader-link">Nearby</Link>
                      </div>

                      <GatewayDest name="header-separator" className="MainHeader-sectionItem" />
                      <GatewayDest name="header-filters" className="MainHeader-sectionItem" />
                    </div>

                    <div className="MainHeader-section">
                      <div className="MainHeader-sectionItem">
                        <Link to="/manage-posts/create" className="Btn Btn--primary">Create Post</Link>
                      </div>

                      <div className="MainHeader-sectionItem">
                        <form onSubmit={this.handleSearch}>
                          <div className="FormInputGroup FormInputGroup--backdrop">
                            <input onChange={this.handleInput} value={this.state.search} type="search" className="FormInputGroup-input" placeholder="Search" />

                            <div className="FormInputGroup-button">
                              <button className="PlainBtn">
                                <StaticImg src="icons/search_icon_red@1x.png" alt="Search" />
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <Permission rule="auth">
                  <div className="MainHeader-sidebar MainHeader-sidebar--right">
                    <button className="PlainBtn" type="button" onClick={this.handleToggleRightDrawer}>
                      <StaticImg src="icons/notif_red@1x.png" alt="Drawer Icon" />
                    </button>

                    <div className="MainHeader-notificationBadge">{user.num_notifs}</div>
                  </div>
                </Permission>
              </div>

              <div className="MainWrapper-content">
                {this.props.children}
              </div>

              <div className="Footer">
                <div className="Container">
                  <div className="Footer-inner">
                    <div className="Footer-section">
                      <a href="#" className="Footer-link">About Us</a>
                      <a href="#" className="Footer-link">Support</a>
                      <a href="#" className="Footer-link">Blog</a>
                      <a href="#" className="Footer-link">Press</a>
                      <a href="#" className="Footer-link">Jobs</a>
                      <a href="#" className="Footer-link">Privacy</a>
                      <a href="#" className="Footer-link">Terms</a>
                    </div>

                    <div className="Footer-section">
                      <span className="Footer-text">
                        &copy; 2015 GoCart, Philippines.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="MainWrapper-sidebar">
            </div>
          </div>

          <GatewayDest name="global" />
        </div>
      </GatewayProvider>
    );
  }

  handleEscapeKeydown = (evt) => {
    const key = evt.which || evt.keyCode;

    if ( key === 27 && (this.state.left || this.state.right) ) {
      this.setState({ left: false, right: false });
    }
  }

  handleToggleLeftDrawer = () => {
    this.setState((state) => ({ left: !state.left }));
  }

  handleToggleRightDrawer = () => {
    this.setState((state) => ({ right: !state.right }));


    const {state} = this;

    if ( !state.right ) {

      const query = qs.stringify({
        start: state.offset,
        end: state.offset + 19
      });

      this.setState({
        loading: true
      });

      return axios.get(`/user/${this.props.user.id}/notifications?${query}`)
        .then((res) => {
          this.setState({
            notifications: state.offset === 0
              ? res.data
              : [ ...state.notifications, ...res.data],
            loading: false,
            offset: state.offset + 20
          });

          return res;
        })
        .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
            loading: false,
            message: lang.errors.server
          });
        } else {
          this.setState({
            loading: false,
            last: res.status == 404 > res.status == 404 ? true : false
          });
        }

        return Promise.reject(res);
      });
    }
  }

  handleInput = (evt) => {
    this.setState(
      { search: evt.target.value },
      this.deferredSearch);
  }

  handleSearch = (evt) => {
    evt.preventDefault();
    this.search();
  }

  search = () => {
    const {search} = this.state;

    if ( !search.length ) {
      return;
    }

    history.push({
      pathname: 'search',
      query: { q: search }
    });
  }

  deferredSearch = defer(this.search, 250)
}

const mapState = ({auth}) => ({ user: auth.user });

export default flowRight(
  auth,
  connect(mapState)
)(AppView);
