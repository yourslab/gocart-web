import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import formatCurrency from 'app/utils/formatCurrency';
import StaticImg from 'app/components/StaticImg';
import UserImg from 'app/components/UserImg';
import ProductImg from 'app/components/ProductImg';
import RatingWidget from 'app/components/RatingWidget';
import UserFollowWidget from 'app/components/UserFollowWidget';
import ProductCardDescription from 'app/components/ProductCardDescription';
import ProductBumpInfo from 'app/components/ProductBumpInfo';

const ProductCard = ({product, onFollow}) =>
  <div className="ProductCard">
    <div className="ProductCard-userPanel">
      <div className="ProductCard-userPanelSection">
        <Link to={`/@${product.username}`} className="ProductCard-avatarContainer">
          <UserImg src={product.prof_pic_link} username={product.username} className="ProductCard-avatar" />
        </Link>

        <div className="ProductCard-userPanelMeta">
          <h4 className="ProductCard-name">
            <Link to={`/@${product.username}`} className="ProductCard-nameLink">
              {product.name}
            </Link>
          </h4>

          <RatingWidget score={product.avg_rating} />
        </div>
      </div>

      <div className="ProductCard-userPanelSection">
        <UserFollowWidget
          user={{ id: product.user_id, is_followed: product.is_followed }}
          onFollow={onFollow} />
      </div>
    </div>

    <div className="ProductCard-inner">
      <div className="ProductCard-thumbnail">
        <ProductImg src={product.photo_list[0]} id={product.id} className="ProductCard-thumbnailImage" />

        <div className="ProductCard-thumbnailOverlay">
          <h1 className="ProductCard-pricing">
            {formatCurrency(product.price)}
          </h1>
        </div>
      </div>

      <div className="ProductCard-body">
        <div className="ProductCard-heading">
          <div className="ProductCard-headingSection">
            <h4 className="ProductCard-title">
              <Link to={`/products/${product.id}`} className="ProductCard-titleLink">
                {product.title}
              </Link>
            </h4>
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
          <ProductCardDescription
            description={product.desc}
            id={product.id} />
        </p>

        <div className="CommentMeta">
          <div>
            <Link to={`/products/${product.id}`} className="CommentMeta-highlight">
              <ProductBumpInfo product={product} />
            </Link>
          </div>

          <div>
            <Link to={`/products/${product.id}`} className="CommentMeta-count">
              {product.num_comments} comments
            </Link>
          </div>
        </div>
      </div>

      <div className="ProductCard-actions">
        <div>
          <button className="Btn Btn--default Btn--borderless">
            GoBump
          </button>

          <Link to={`/products/${product.id}`} className="Btn Btn--default Btn--borderless">
            Comment
          </Link>
        </div>

        {/*<div>
          <button className="Btn Btn--primary">
            Add to Cart
          </button>
        </div>*/}
      </div>
    </div>
  </div>

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
