import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ProductCard from 'app/components/ProductCard';
import Switchbox from 'app/components/Switchbox';

export default class AppManagePostsArchivedView extends Component {
  render() {
    return (
      <div>
        <Helmet title="Archived Posts" />

        <div className="SidebarContainer-panelHeading">
          <div className="SidebarContainer-panelHeadingSection" />

          <div className="SidebarContainer-panelHeadingSection">
            <button className="Btn Btn--primary Btn--inverted Btn--borderless">
              Delete all permanently
            </button>
          </div>
        </div>

        <div className="Grid">
          {[[], [], [], [], [], []].map(() =>
            <div className="Grid-cell u-size6 u-spacer-base">
              <div className="ProductCard">
                <div className="ProductCard-thumbnail">
                  <img src="https://placeimg.com/500/280/tech" className="ProductCard-thumbnailImage" />

                  <div className="ProductCard-thumbnailOverlay">
                    <h1 className="ProductCard-pricing">
                      P 0.00
                    </h1>
                  </div>
                </div>

                <div className="ProductCard-userPanel">
                  <div className="ProductCard-userPanelSection">
                    <img src="https://placeimg.com/48/48/people" className="ProductCard-avatar" />

                    <div className="ProductCard-userPanelMeta">
                      <h4 className="Productcard-name">Mike Greene</h4>
                    </div>
                  </div>

                  <div className="ProductCard-userPanelSection">
                  </div>
                </div>

                <div className="ProductCard-body">
                  <div className="ProductCard-heading">
                    <div>
                      <h4 className="ProductCard-title">Looking for</h4>
                    </div>

                    <div className="ProductCard-headingSection">
                      <div className="ProductCard-headingSectionItem">
                        <span className="ProductCard-meta">2 months</span>
                      </div>

                      <div className="ProductCard-headingSectionItem">
                        <span className="ProductCard-meta">0.5km</span>
                      </div>
                    </div>
                  </div>

                  <p className="ProductCard-description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt  ut labore et dolore magna aliqua.
                  </p>

                  <div className="ProductCard-tags">
                    <a href="#" className="TagBadge">Tags</a>
                  </div>

                  <div className="CommentMeta">
                    <div>
                      <a href="#" className="CommentMeta-highlight">Mary Ann Smithson</a>&nbsp;
                      and <a href="#" className="CommentMeta-highlight">20 bumped this</a>
                    </div>

                    <div>
                      <span className="CommentMeta-count">3 comments</span>
                    </div>
                  </div>
                </div>

                <div className="ProductCard-actions">
                  <div className="ProductCard-actionsSection">
                    <Switchbox />
                    &nbsp; Reactivate
                  </div>

                  <div>
                    <button className="Btn Btn--primary Btn--inverted Btn--borderless">
                      Delete Permanently
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
