import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {resolve} from 'react-resolver';
import axios from 'axios';
import flowRight from 'lodash/flowRight';
import Infinite from 'app/components/Infinite';
import ProductCard from 'app/components/ProductCard';
import StaticImg from 'app/components/StaticImg';
import Modal from 'app/components/Modal';
import FollowersList from './components/FollowersList';
import FollowingList from './components/FollowingList';

class AppProfileView extends Component {
  state = {
    loading: false,
    error: false
  };

  render() {
    const {auth, user, posts} = this.props;

    return (
      <div>
        <Helmet title={user.name} />

        <div className="Container">
          <div className="ProfilePanel">
            <div className="ProfilePanel-cover">
              <img src="https://placeimg.com/998/375/any" className="ProfilePanel-coverImage" alt="Cover" />

              <div className="ProfilePanel-coverOverlay">
                <div>
                  <div className="ProfilePanel-coverOverlayInfo">
                    <img src="https://placeimg.com/150/150/any" className="ProfilePanel-avatar" alt="Avatar" />

                    <div>
                      <h1 className="ProfilePanel-name">{user.name}</h1>
                      <h5 className="ProfilePanel-bio">{user.about}</h5>
                    </div>
                  </div>
                </div>

                <div>
                  {user.id === auth.id 
                    ? <Link to="/me" className="Btn Btn--clean">
                      Edit Profile
                      </Link>
                    : null 
                  }
                </div>
              </div>
            </div>

            <div className="ProfilePanel-body">
              <div className="ProfilePanel-canopy">
                <div className="ProfilePanel-canopySection">
                  <div className="ProfilePanel-canopySectionItem">
                    <button 
                      onClick={() => this.refs.followers.open()} 
                      className="Btn Btn--primary Btn--inverted Btn--borderless">
                      {user.num_followers} Followers
                    </button>
                  </div>

                  <div className="ProfilePanel-canopySectionItem">
                    <button 
                      onClick={() => this.refs.following.open()} 
                      className="Btn Btn--primary Btn--inverted Btn--borderless">
                      {user.num_following} Following
                    </button>
                  </div>

                  <div className="ProfilePanel-canopySectionItem">
                    <button 
                      className="Btn Btn--primary Btn--inverted Btn--borderless">
                      {user.num_reviews} Reviews
                    </button>
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
                <div className="Grid">
                  {posts.map((post, i) =>
                    <div className="Grid-cell u-size6 u-spacer-base" key={i}>
                      {posts.length === i + 1 
                        ? auth.id === user.id 
                          ? <div className="BlankSlate">
                              <StaticImg src="/icons/post_icon@1x.png" />
                              <h1> Add Shelf </h1>
                            </div>
                          : null
                        : <ProductCard />
                      }
                    </div>
                  )}
                </div>
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
        loading: false
      }));
    }, 1500);
  }
}

const mapState = state => ({
  auth: state.auth.user
});

export default flowRight(
  resolve('user', (props) => { 
    return axios
      .get(`user/@${props.routeParams.user}`)
      .then((res) => res.data);
  }),
  resolve('posts', (props) => {
    return axios
      .get(`/user/${props.user.id}/posts?start=0&end=20&latitude=14.599512&longitude=120.984219`)
      .then((res) => res.data);
  }),
  connect(mapState)
)(AppProfileView);
