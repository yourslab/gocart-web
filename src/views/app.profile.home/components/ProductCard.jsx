import React, {PropType} from 'react';
import {Link} from 'react-router';
import getPostType from 'app/utils/getPostType';
import formatCurrency from 'app/utils/formatCurrency';
import StaticImg from 'app/components/StaticImg';
import ProductImg from 'app/components/ProductImg';
import ProductCardDescription from 'app/components/ProductCardDescription';
import ProductBumpInfo from 'app/components/ProductBumpInfo';
import BumpButton from 'app/components/BumpButton';
import ProductCommentLink from 'app/components/ProductCommentLink';

const ProductCard = ({product, onBump}) =>
  <div className="Grid-cell u-size6 u-spacer-base">
    <div className="ProductCard">
      <div className="ProductCard-inner">
        <div className="ProductCard-thumbnail">
          <ProductImg src={`${product.photo_list[0]}_thumb`} id={product.id} className="ProductCard-thumbnailImage" />

          <div className="ProductCard-thumbnailOverlay">
            <h1 className="ProductCard-pricing">
              {formatCurrency(product.price)}
            </h1>
          </div>
        </div>

        <div className="ProductCard-body">
          <div className="ProductCard-heading">
            <div className="ProductCard-headingSection">
              <small className="ProductCard-type">
                {getPostType(product.post_type)}
              </small>
            </div>
          </div>

          <h4 className="ProductCard-title">
            <Link to={`/posts/${product.id}`} className="ProductCard-titleLink">
              {product.title}
            </Link>
          </h4>

          <p className="ProductCard-description">
            <ProductCardDescription
              description={product.desc}
              id={product.id} />
          </p>

          <div className="CommentMeta">
            <div>
              <Link to={`/posts/${product.id}`} className="CommentMeta-highlight">
                {product.num_likes} bumped this
              </Link>
            </div>

            <div>
              <Link to={`/posts/${product.id}`} className="CommentMeta-count">
                {product.num_comments} comments
              </Link>
            </div>
          </div>
        </div>

        <div className="ProductCard-actions">
          <div className="ProductCard-actionsSection">
            <div className="ProductCard-actionsSectionItem">
              <BumpButton
                product={{ id: product.id, is_liked: product.is_liked }}
                onBump={onBump} />
            </div>

            <div className="ProductCard-actionsSectionItem">
              <ProductCommentLink id={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

export default ProductCard;
