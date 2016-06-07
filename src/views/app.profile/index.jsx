import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import ProductCard from 'app/components/ProductCard';
import StaticImg from 'app/components/StaticImg';

export default class AppProfileView extends Component {
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
                    <button className="Btn Btn--primary Btn--inverted Btn--borderless">28 Followers</button>
                  </div>

                  <div className="ProfilePanel-canopySectionItem">
                    <button className="Btn Btn--primary Btn--inverted Btn--borderless">45 Following</button>
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
      </div>
    );
  }
}