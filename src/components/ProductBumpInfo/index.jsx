import React, {PropTypes} from 'react';

// @todo: Handle scenario where a user in
// the `liked_by` list unlikes the product
//
// @todo: Handle scenario where the auth
// bumped the post (e.g., `You, X, and 5 more bumped this`)
const ProductBumpInfo = ({product}) => {
  if ( product.liked_by.length ) {
    const user = product.liked_by[0];

    if ( product.num_likes - 1 >= 1 ) {
      return <span>{user.name} and {product.num_likes - 1} bumped this</span>
    }

    return <span>{user.name} bumped this</span>
  }

  return <span>{product.num_likes} bumped this</span>
}

ProductBumpInfo.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductBumpInfo;
