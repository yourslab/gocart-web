import React, {Component} from 'react';
import {Link} from 'react-router';
import StaticImg from 'app/components/StaticImg';

/**
 * A static version of `BumpButton`.
 *
 * Right now, we have no means to "bump"
 * a product in the feed as well as in
 * profile.
 */
const ProductBumpLink = ({id}) =>
  <Link
    to={`/posts/${id}`}
    className="Btn Btn--default Btn--noPadding">
    <span className="Btn-icon">
      <StaticImg src="icons/bump_icon.svg" />
    </span>
    Bump
  </Link>

export default ProductBumpLink;
