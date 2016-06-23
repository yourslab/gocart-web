import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {resolve} from 'react-resolver';
import axios from 'axios';
import flowRight from 'lodash/flowRight';
import qs from 'qs';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import Infinite from 'app/components/Infinite';
import StaticImg from 'app/components/StaticImg';
import Modal from 'app/components/Modal';
import PostCard from './components/PostCard';
import FollowersList from './components/FollowersList';
import FollowingList from './components/FollowingList';

class AppProfileView extends Component {
  state = {
    posts: [],
    offset: 0,
    filters: {
      longtitude: 0,
      latitude: 0,
      type: 0,
      distance: 0,
      rating: 0
    },

    loading: false,
    error: false,
    errors: {}
  };

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    const {auth, user} = this.props;
    const {posts} = this.state;
    console.log(this.state.errors);

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
                      <PostCard post={post} />
                    </div>
                  )}
                  {auth.id === user.id
                    ? <div className="Grid-cell u-size6 u-spacer-base">
                        <div className="BlankSlate">
                            <StaticImg src="/icons/post_icon@1x.png" />
                            <h1> Add Shelf </h1>
                          </div>
                      </div>
                    : null
                  }
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

  handleRequest = (offset = this.state.offset) => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    const {state, props} = this;

    const query = qs.stringify({
      ...state.filters,
      start: offset,
      end: offset + 19,
      type: 1
    });

    return axios.get(`/user/${props.user.id}/posts?${query}`)
      .then((res) => {
        this.setState({
          posts: res.data,
          loading: false,
          offset: offset + 20
        });

        return res;
      })
      .catch((res) => {
        this.setState({
          loading: false,
          error: true,
          errors: formatValidationErrors(res.data.errors)
        });

        return Promise.reject(res);
      });
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
  connect(mapState)
)(AppProfileView);
