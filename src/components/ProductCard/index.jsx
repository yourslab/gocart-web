import React, {PropTypes} from 'react';
import formatCurrency from 'app/utils/formatCurrency';
import StaticImg from 'app/components/StaticImg';
import RatingWidget from 'app/components/RatingWidget';

const ProductCard = ({product}) =>
  <div className="ProductCard">
    <div className="ProductCard-userPanel">
      <div className="ProductCard-userPanelSection">
        <img src="https://placeimg.com/48/48/people" className="ProductCard-avatar" />

        <div className="ProductCard-userPanelMeta">
          <h4 className="ProductCard-name">Mike Greene</h4>
          <RatingWidget />
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
            {formatCurrency(product.price)}
          </h1>
        </div>
      </div>

      <div className="ProductCard-body">
        <div className="ProductCard-heading">
          <div>
            <h4 className="ProductCard-title">{product.title}</h4>
          </div>

          {/*<div className="ProductCard-headingSection">
            <div className="ProductCard-headingSectionItem">
              <span className="ProductCard-meta">2 months</span>
            </div>

            <div className="ProductCard-headingSectionItem">
              <span className="ProductCard-meta">0.5km</span>
            </div>
          </div>*/}
        </div>

        <p className="ProductCard-description">
          {product.desc}
        </p>

        <div className="ProductCard-tags">
          {product.tags.map((tag, i) =>
            <div className="ProductCard-tag" key={i}>
              <a href="#" className="TagBadge">
                {tag}
              </a>
            </div>
          )}
        </div>

        <div className="CommentMeta">
          <div>
            <a href="#" className="CommentMeta-highlight">Mary Ann Smithson</a>&nbsp;
            and <a href="#" className="CommentMeta-highlight">20 bumped this</a>
          </div>

          <div>
            <span className="CommentMeta-count">{product.num_comments} comments</span>
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

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
