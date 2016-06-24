import React from 'react';
import {Link} from 'react-router';
import getPostType from 'app/utils/getPostType';
import formatCurrency from 'app/utils/formatCurrency';
import S3Image from 'app/components/S3Image';

const ProductCard = ({product}) =>
  <div className="Grid-cell u-size4 u-spacer-base">
    <Link to={`/products/${product.id}`} className="SearchProductCard">
      <div className="SearchProductCard-thumbnail">
        <S3Image src={product.photo_list[0]} username={product.username} className="SearchProductCard-thumbnailImage" alt="Thumbnail" />
      </div>

      <div>
        <h6 className="SearchProductCard-label">{getPostType(product.post_type)}</h6>
        <h4 className="SearchProductCard-title">{product.title}</h4>
        <h4 className="SearchProductCard-price">P {formatCurrency(product.price)}</h4>
      </div>
    </Link>
  </div>

export default ProductCard;
