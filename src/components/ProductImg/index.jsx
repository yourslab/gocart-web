import React from 'react';
import getProductImg from 'app/utils/getProductImg';

const ProductImg = ({src, id, ...props}) =>
  <img src={getProductImg(id, src)} {...props} />

ProductImg.propTypes = {
  id: React.PropTypes.number.isRequired
};

export default ProductImg;
