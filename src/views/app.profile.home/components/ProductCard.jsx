import React, {PropType} from 'react';
import {Link} from 'react-router';
import numeral from 'numeral';
import StaticImg from 'app/components/StaticImg';
import ProductImg from 'app/components/ProductImg';
import ProductCardDescription from 'app/components/ProductCardDescription';
import ProductBumpInfo from 'app/components/ProductBumpInfo';

const ProductCard = ({product}) =>
  <div className="Grid-cell u-size6 u-spacer-base">
    <div className="ProductCard">
      <div className="ProductCard-inner">
        <div className="ProductCard-thumbnail">
          <ProductImg src={product.photo_list[0]} id={product.id} className="ProductCard-thumbnailImage" />

          <div className="ProductCard-thumbnailOverlay">
            <h1 className="ProductCard-pricing">
              P {numeral(product.price).format('0,0.00')}
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
          </div>

          <p className="ProductCard-description">
            <ProductCardDescription
              description={product.desc}
              id={product.id} />
          </p>

          <div className="CommentMeta">
            <div>
              <Link to={`/products/${product.id}`} className="CommentMeta-highlight">
                {product.num_likes} bumped this
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
            <Link to={`/products/${product.id}`} className="Btn Btn--default Btn--borderless">
              GoBump
            </Link>

            <Link to={`/products/${product.id}`} className="Btn Btn--default Btn--borderless">
              Comment
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>

export default ProductCard;
