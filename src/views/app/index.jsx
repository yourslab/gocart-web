import React, { Component } from 'react';
import cn from 'classnames';
import linkState from 'react-link-state';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {GatewayProvider, GatewayDest} from 'react-gateway';
import defer from 'app/utils/defer';
import history from 'app/history';
import StaticImg from 'app/components/StaticImg';
import Permission from 'app/components/Permission';

class AppView extends Component {
  state = {
    left: false,
    right: false,
    search: ''
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKeydown);
  }

  render() {
    const {left, right} = this.state;
    const {user} = this.props;

    return (
      <GatewayProvider>
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

                  <div className="MainDrawerNotification">
                    <div className="MainDrawerNotification-heading">
                      <h4>Notifications</h4>
                    </div>

                    <div className="MainDrawerNotification-item MainDrawerNotification-item--unseen">
                      <div className="MainDrawerNotification-itemHeading">
                        <div className="MainDrawerNotification-itemAvatar">
                          <img src="https://placeimg.com/40/40/any" className="MainDrawerNotification-itemAvatarImage" alt="Avatar" />
                        </div>

                        <div>
                          <h6 className="MainDrawerNotification-itemName">Aaron Hughes</h6>
                          <h6 className="MainDrawerNotification-itemTime"><small>5 mins ago</small></h6>
                        </div>
                      </div>

                      <div className="MainDrawerNotification-itemBody">
                        <h6 className="MainDrawerNotification-itemAction">Posted a comment</h6>
                        <h6 className="MainDrawerNotification-itemDetails">Lorem ipsum dolor sit amet...</h6>
                      </div>
                    </div>

                    <div className="MainDrawerNotification-item">
                      <div className="MainDrawerNotification-itemHeading">
                        <div className="MainDrawerNotification-itemAvatar">
                          <img src="https://placeimg.com/40/40/any" className="MainDrawerNotification-itemAvatarImage" alt="Avatar" />
                        </div>

                        <div>
                          <h6 className="MainDrawerNotification-itemName">Aaron Hughes</h6>
                          <small className="MainDrawerNotification-itemTime">5 mins ago</small>
                        </div>
                      </div>

                      <div className="MainDrawerNotification-itemBody">
                        <h6 className="MainDrawerNotification-itemAction">Bumped your post</h6>
                        <img src="https://placeimg.com/120/60/any" className="MainDrawerNotification-itemThumbnail" alt="Thumbnail" />
                      </div>
                    </div>
                  </div>
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

                  <div className="MainHeader-notificationBadge">12</div>
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
export default connect(mapState)(AppView);
