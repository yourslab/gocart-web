import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import Modal from 'react-modal';

import ProductCard from 'app/components/ProductCard';
import StaticImg from 'app/components/StaticImg';
import FollowersList from './components/FollowersList';
import FollowingList from './components/FollowingList';

const dialogStyle = {
  content: {
    width: '35%',
    height: 450,
    overflow: 'visible',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
    padding: 0,
    boxShadow: '0px 0px 4px rgba(0, 0, 0, .14), 0px 4px 8px rgba(0, 0, 0, .28)',
    zIndex: 100
  },

  overlay: {
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
};


export default class AppProfileView extends Component {
  state = {
    openFollowers: false,
    openFollowing: false
  };

  render() {
    return (
      <div>
        <Helmet title="John Doe" />

        <div className="Container">
          <div className="ProfilePanel">
            <div className="ProfilePanel-cover">
              <img src="https://placeimg.com/998/375/any" className="ProfilePanel-coverImage" alt="Cover" />

              <div className="ProfilePanel-coverOverlay">
                <div>
                  <div className="ProfilePanel-coverOverlayInfo">
                    <img src="https://placeimg.com/150/150/any" className="ProfilePanel-avatar" alt="Avatar" />

                    <div>
                      <h1 className="ProfilePanel-name">Berkie Senders</h1>
                      <h5 className="ProfilePanel-bio">Marine Biologist</h5>
                    </div>
                  </div>
                </div>

                <div>
                  <Link to="/me" className="Btn Btn--clean">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            <div className="ProfilePanel-body">
              <div className="ProfilePanel-canopy">
                <div className="ProfilePanel-canopySection">
                  <div className="ProfilePanel-canopySectionItem">
                    <button onClick={this.openFollowersModal} className="Btn Btn--primary Btn--inverted Btn--borderless">28 Followers</button>
                  </div>

                  <div className="ProfilePanel-canopySectionItem">
                    <button onClick={this.openFollowingModal} className="Btn Btn--primary Btn--inverted Btn--borderless">45 Following</button>
                  </div>

                  <div className="ProfilePanel-canopySectionItem">
                    <button className="Btn Btn--primary Btn--inverted Btn--borderless">5 Reviews</button>
                  </div>
                </div>

                <div className="ProfilePanel-canopySection">
                  <div className="ProfilePanel-canopySectionItem">
                    <button className="Btn Btn--primary Btn--inverted">
                      Chat
                    </button>
                  </div>

                  <div className="ProfilePanel-canopySectionItem">
                    <button className="Btn Btn--success">
                      Follow
                    </button>
                  </div>
                </div>
              </div>

              <div className="ProfilePanel-bodyHeading">
                <div>
                  <h1 className="ProfilePanel-bodyHeadingTitle">My Cart</h1>
                </div>

                <div>
                  <div className="Tab Tab--info">
                    <a href="#" className="Tab-item">New</a>
                    <a href="#" className="Tab-item">Popular</a>
                    <a href="#" className="Tab-item">Active</a>
                    <a href="#" className="Tab-item Tab-item--active">Active</a>
                    <a href="#" className="Tab-item">Inactive</a>
                    <a href="#" className="Tab-item">Expired</a>
                    <a href="#" className="Tab-item">Sold</a>
                  </div>
                </div>
              </div>

              <div className="Grid">
                {[[], [], [], [], [], []].map(() =>
                  <div className="Grid-cell u-size6 u-spacer-base">
                    <ProductCard />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.openFollowers}
          onRequestClose={this.closeModal}
          style={dialogStyle}>
          <FollowersList closeModal={this.closeModal} />
        </Modal>

        <Modal
          isOpen={this.state.openFollowing}
          onRequestClose={this.closeModal}
          style={dialogStyle}>
          <FollowingList closeModal={this.closeModal} />
        </Modal>

        {this.props.children}
      </div>
    );
  }

  openFollowersModal = () => {
    this.setState({ openFollowers: true });
  }

  openFollowingModal = () => {
    this.setState({ openFollowing: true });
  }

  closeModal = () => {
    this.setState({ openFollowers: false, openFollowing: false});
  }
}
