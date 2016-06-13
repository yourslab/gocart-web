import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Infinite from 'app/components/Infinite';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import ProductCard from 'app/components/ProductCard';
import StaticImg from 'app/components/StaticImg';
import Modal from 'app/components/Modal';
import FollowersList from './components/FollowersList';
import FollowingList from './components/FollowingList';

class AppProfileView extends Component {
  state = {
    feed: [{}, {}, {}, {}],
    loading: false,
    error: false
  };

  render() {
    const {auth} = this.props;
    const feed = map(
      groupBy(toPairs(this.state.feed), ([i]) => i % 2 === 0 ? i : i - 1),
      (set) => [set[0][1], set[1][1]]
    );

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
                    <button onClick={() => this.refs.followers.open()} className="Btn Btn--primary Btn--inverted Btn--borderless">28 Followers</button>
                  </div>

                  <div className="ProfilePanel-canopySectionItem">
                    <button onClick={() => this.refs.following.open()} className="Btn Btn--primary Btn--inverted Btn--borderless">45 Following</button>
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

              <Infinite callback={this.handleRequest}>
                {feed.map((set, i) =>
                  <div className="Grid" key={i}>
                    {set.map((product, j) => 
                      <div className="Grid-cell u-size6 u-spacer-base" key={j}>
                        <ProductCard />
                      </div>
                    )}
                  </div>
                )}
              </Infinite>

              {this.state.loading ? <div className="Spinner u-spacer-large" /> : null }
            </div>
          </div>
        </div>

        <Modal
          ref="followers"
          size="sm">
          <FollowersList onClose={() => this.refs.followers.close()} />
        </Modal>

        <Modal
          ref="following"
          size="sm">
          <FollowingList onClose={() => this.refs.following.close()} />
        </Modal>
      </div>
    );
  }

  handleRequest = () => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    setTimeout(() => {
      this.setState((state) => ({
        feed: [...state.feed, {}, {}],
        loading: false
      }));
    }, 1500);
  }
}

const mapState = state => ({
  auth: state.auth.user
});

export default connect(mapState)(AppProfileView);
