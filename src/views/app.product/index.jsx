import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

export default class AppProductView extends Component {
  render() {
    return (
      <div className="Container">
        <Helmet title="Apple MacBook Pro" />

        <div className="ProductCardFull">
          <div className="ProductCardFull-thumbnail">
            <img className="ProductCardFull-thumbnailImage" alt="Thumbnail" />

            <div className="ProductCardFull-thumbnailOverlay">
              <div className="ProductCardFull-thumbnailOverlaySection">
                <h1 className="ProductCardFull-thumbnailOverlaySectionItem">P 0.00</h1>
              </div>

              <div className="ProductCardFull-thumbnailOverlaySection">
                <h5 className="ProductCardFull-thumbnailOverlaySectionItem">3 bumps</h5>
                <h5 className="ProductCardFull-thumbnailOverlaySectionItem">5 comments</h5>
              </div>
            </div>
          </div>

          <div className="ProductCardFull-panel">
            <div className="ProductCardFull-panelCanopy">
              <div className="ProductCardFull-panelCanopySection">
                <div className="ProductCardFull-panelCanopySectionItem">
                  <img src="https://placeimg.com/120/100/any" className="ProductCardFull-avatar" alt="Thumbnail" />
                </div>

                <div className="ProductCardFull-panelCanopySectionItem">
                  <h2 className="ProductCardFull-panelCanopyName">Bertie Sanchez</h2>
                </div>
              </div>
            </div>

            <div className="ProductCardFull-panelHeading">
              <div><h5 className="ProductCardFull-name">Apple MacBook Pro</h5></div>
            </div>

            <p className="ProductCardFull-description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="ProductCardFull-tags">
              <a href="#" className="TagBadge">Audio Peripherals</a>
            </div>

            <div className="ProductCardFull-commentInfo">
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

            <a href="#" className="ProductCardFull-commentLoadMore">
              View 3 more comments
            </a>

            <div className="CommentWidget">
              <div className="CommentWidget-inner">
                <div className="CommentWidget-item">
                  <p><a href="#" className="CommentWidget-itemName">Manila Shopper</a> &nbsp; Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>

              <div className="CommentWidget-form">
                <input type="text" className="CommentWidget-input" placeholder="Add comment..." />

                <div>
                  <button className="Btn Btn--default Btn--borderless">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
