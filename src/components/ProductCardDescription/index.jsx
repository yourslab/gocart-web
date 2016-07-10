import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import trimEnd from 'lodash/trimEnd';

const ProductCardDescription = ({description, id}) =>
  description.length < 150
    ? <span>{description}</span>
    : (
      <span>
        {trimEnd(description.substr(0, 150))}...
        <Link to={`/posts/${id}`}>Read More</Link>
      </span>
    );

ProductCardDescription.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default ProductCardDescription;
