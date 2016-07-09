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
const ProductCommentLink = ({id}) =>
  <Link
    to={`/products/${id}`}
    className="Btn Btn--default Btn--noPadding">
    {/*<span className="Btn-icon">
      <StaticImg src="icons/chat_icon@1x.png" />
    </span>*/}
    Comment
  </Link>

export default ProductCommentLink;
