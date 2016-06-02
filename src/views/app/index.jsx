import React, { Component } from 'react';
import cn from 'classnames';
import StaticImg from 'app/components/StaticImg';

export default class AppView extends Component {
  state = {
    left: false,
    right: false
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKeydown);
  }

  render() {
    const {left, right} = this.state;

    return (
      <div className="MainWrapper">
        <div className={cn('MainWrapper-drawer MainWrapper-drawer--left', { 'MainWrapper-drawer--active': left })}>
          <div className="MainDrawer">
            <div className="MainDrawer-body">
              <div className="MainDrawer-close">
                <button className="Btn Btn--plain" type="button" onClick={this.handleToggleLeftDrawer}>
                  <StaticImg src="icons/close_black@1x.png" alt="Close" />
                </button>
              </div>

              <div className="MainDrawerSidebar">
                <a href="#" className="MainDrawerSidebar-link MainDrawerSidebar-link--active">Discover</a>
                <a href="#" className="MainDrawerSidebar-link">Create a post</a>
                <div className="MainDrawerSidebar-separator" />
                <a href="#" className="MainDrawerSidebar-link">My Profile</a>
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

        <div className={cn('MainWrapper-drawer MainWrapper-drawer--right', { 'MainWrapper-drawer--active': right })}>
          <div className="MainDrawer">
            <div className="MainDrawer-body">
              <div className="MainDrawer-close">
                <button className="Btn Btn--plain" type="button" onClick={this.handleToggleRightDrawer}>
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

        <div className="MainWrapper-body">
          <div className="MainHeader">
            <div className="MainHeader-sidebar MainHeader-sidebar--left">
              <button className="Btn Btn--plain" type="button" onClick={this.handleToggleLeftDrawer}>
                <StaticImg src="icons/drawer_red@1x.png" alt="Drawer Icon" />
              </button>
            </div>

            <div className="Container">
              <div className="MainHeader-inner">
                <div className="MainHeader-section">
                  <div className="MainHeader-sectionItem">
                    <a href="#" className="MainHeader-logoLink">
                      <StaticImg src="logo.svg" alt="logo" className="MainHeader-logo" />
                    </a>
                  </div>

                  <div className="MainHeader-sectionItem">
                    <a href="#" className="MainHeader-link MainHeader-link--active">Popular</a>
                  </div>

                  <div className="MainHeader-sectionItem">
                    <a href="#" className="MainHeader-link">Recent</a>
                  </div>

                  <div className="MainHeader-sectionItem">
                    <a href="#" className="MainHeader-link">Nearby</a>
                  </div>

                  <div className="MainHeader-sectionItem">
                    <div className="MainHeader-separator" />
                  </div>

                  <div className="MainHeader-sectionItem">
                    <button className="MainHeader-button">More Filters</button>
                  </div>
                </div>

                <div className="MainHeader-section">
                  <form>
                    <div className="FormGroup FormGroup--backdrop">
                      <input type="text" className="FormGroup-input" placeholder="Search" />

                      <div className="FormGroup-button">
                        <button className="Btn Btn--plain Btn--small">
                          <StaticImg src="icons/search_icon_red@1x.png" alt="Search" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="MainHeader-sidebar MainHeader-sidebar--right">
              <button className="Btn Btn--plain" type="button" onClick={this.handleToggleRightDrawer}>
                <StaticImg src="icons/notif_red@1x.png" alt="Drawer Icon" />
              </button>
            </div>
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
    );
  }

  handleEscapeKeydown = (evt) => {
    const key = evt.which || evt.keyCode;
    console.log(key);

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
}
