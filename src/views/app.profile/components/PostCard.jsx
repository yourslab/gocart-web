import React, {PropType} from 'react';
import {Link} from 'react-router';
import numeral from 'numeral';
import StaticImg from 'app/components/StaticImg';
import Switchbox from 'app/components/Switchbox';
import ProductImg from 'app/components/ProductImg';
import ProductCardDescription from 'app/components/ProductCardDescription';


const PostCard = ({post}) =>
  <div className="ProductCard">
    <div className="ProductCard-inner">
      <div className="ProductCard-thumbnail">
        <ProductImg src={post.photo_list[0]} id={post.id} className="ProductCard-thumbnailImage" />

        <div className="ProductCard-thumbnailOverlay">
          <h1 className="ProductCard-pricing">
            P {numeral(post.price).format('0,0.00')}
          </h1>
        </div>
      </div>

      <div className="ProductCard-body">
        <div className="ProductCard-heading">
          <div>
            <h4 className="ProductCard-title">Looking for</h4>
          </div>
        </div>

        <p className="ProductCard-description">
          <ProductCardDescription
            description={post.desc}
            id={post.id} />
        </p>

        <div className="CommentMeta">
          <div>
            <a href="#" className="CommentMeta-highlight">{post.num_likes} bumped this</a>
          </div>

          <div>
            <span className="CommentMeta-count"> {post.num_comments} comments </span>
          </div>
        </div>
      </div>

      <div className="ProductCard-actions">
        <div>
          <Link to={`/products/${post.id}`} className="Btn Btn--default Btn--borderless">
            GoBump
          </Link>

          <Link to={`/products/${post.id}`} className="Btn Btn--default Btn--borderless">
            Comment
          </Link>
        </div>
      </div>
    </div>
  </div>

export default PostCard;
