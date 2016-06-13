import React from 'react';

const ProductCard = () =>
  <div className="Grid-cell u-size4 u-spacer-base">
    <div className="SearchProductCard">
      <div className="SearchProductCard-thumbnail">
        <img src="https://placeimg.com/120/100/any" className="SearchProductCard-thumbnailImage" alt="Thumbnail" />
      </div>

      <div>
        <div className="SearchProductCard-tags">
          <a href="#" className="TagBadge">Apple</a>
        </div>

        <h6 className="SearchProductCard-label">For Sale</h6>
        <h4 className="SearchProductCard-title">Apple iPad Mini</h4>
        <h4 className="SearchProductCard-price">P 20,000</h4>
      </div>
    </div>
  </div>

export default ProductCard;
