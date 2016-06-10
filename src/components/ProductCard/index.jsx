import React, {PropType} from 'react';
import StaticImg from 'app/components/StaticImg';

const ProductCard = () =>
  <div className="ProductCard">
    <div className="ProductCard-userPanel">
      <div className="ProductCard-userPanelSection">
        <img src="https://placeimg.com/48/48/people" className="ProductCard-avatar" />

        <div className="ProductCard-userPanelMeta">
          <h4 className="Productcard-name">Mike Greene</h4>
        </div>
      </div>

      <div className="ProductCard-userPanelSection">
        <button type="button" className="PlainBtn">
          <StaticImg src="icons/follow_icon@1x.png" alt="Follow" />
        </button>
      </div>
    </div>

    <div className="ProductCard-inner">
      <div className="ProductCard-thumbnail">
        <img src="https://placeimg.com/500/280/tech" className="ProductCard-thumbnailImage" />

        <div className="ProductCard-thumbnailOverlay">
          <h1 className="ProductCard-pricing">
            P 0.00
          </h1>
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
        <div>
          <button className="Btn Btn--default Btn--borderless">
            GoBump
          </button>

          <button className="Btn Btn--default Btn--borderless">
            Comment
          </button>
        </div>

        <div>
          <button className="Btn Btn--primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>

export default ProductCard;
