import React from 'react';
import getAdType from 'app/utils/getAdType';
import formatCurrency from 'app/utils/formatCurrency';

const ProductCard = ({product}) =>
  <div className="Grid-cell u-size4 u-spacer-base">
    <div className="SearchProductCard">
      <div className="SearchProductCard-thumbnail">
        <img src={product.photo_list[0]} className="SearchProductCard-thumbnailImage" alt="Thumbnail" />
      </div>

      <div>
        <div className="SearchProductCard-tags">
          {product.tags.map((tag, i) =>
            <div className="SearchProductCard-tag" key={i}>
              <a href="#" className="TagBadge">
                {tag}
              </a>
            </div>
          )}
        </div>

        <h6 className="SearchProductCard-label">{getAdType(product.post_type)}</h6>
        <h4 className="SearchProductCard-title">{product.title}</h4>
        <h4 className="SearchProductCard-price">P {formatCurrency(product.price)}</h4>
      </div>
    </div>
  </div>

export default ProductCard;
