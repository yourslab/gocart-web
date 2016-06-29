import React, {PropType} from 'react';
import {Link} from 'react-router';
import formatCurrency from 'app/utils/formatCurrency';
import StaticImg from 'app/components/StaticImg';
import Switchbox from 'app/components/Switchbox';

const ProductCard = ({product}) =>
  <div className="Grid-cell u-size6 u-spacer-base">
    <div className="ProductCard">
      <div className="ProductCard-inner">
        <div className="ProductCard-thumbnail">
          <img src="https://placeimg.com/500/280/tech" className="ProductCard-thumbnailImage" />

          <div className="ProductCard-thumbnailOverlay">
            <h1 className="ProductCard-pricing">
              P {formatCurrency(product.price)}
            </h1>
          </div>
        </div>

        <div className="ProductCard-body">
          <div className="ProductCard-heading">
            <div>
              <h4 className="ProductCard-title">{product.title}</h4>
            </div>
          </div>

          <p className="ProductCard-description">
            {product.desc}
          </p>

          <div className="CommentMeta">
            <div>
              <a href="#" className="CommentMeta-highlight">{product.num_likes} bumped this</a>
            </div>

            <div>
              <span className="CommentMeta-count">{product.num_comments} comments</span>
            </div>
          </div>
        </div>

        <div className="ProductCard-actions">
          <div className="ProductCard-actionsSection">
            <Link to={`/manage-posts/${product.id}/edit`} className="Btn Btn--small Btn--primary">
              Edit
            </Link>
          </div>

          <div className="ProductCard-actionsSection">
            <a href="#" className="Btn Btn--small Btn--primary Btn--inverted Btn--borderless">
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

export default ProductCard;
