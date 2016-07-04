import React, {PropType} from 'react';
import numeral from 'numeral';
import StaticImg from 'app/components/StaticImg';
import Switchbox from 'app/components/Switchbox';

const PostCard = ({ post }) =>
  <div className="ProductCard">
    <div className="ProductCard-inner">
      <div className="ProductCard-thumbnail">
        <img src="https://placeimg.com/500/280/tech" className="ProductCard-thumbnailImage" />

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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt  ut labore et dolore magna aliqua.
        </p>

        <div className="CommentMeta">
          <div>
            <a href="#" className="CommentMeta-highlight">Mary Ann Smithson</a>&nbsp;
            and <a href="#" className="CommentMeta-highlight">20 bumped this</a>
          </div>

          <div>
            <span className="CommentMeta-count">3 comments</span>
          </div>
        </div>
      </div>

      <div className="ProductCard-actions">
        <div className="ProductCard-actionsSection">
          <Switchbox />
          &nbsp; Activate
        </div>

        <div className="ProductCard-actionsSection">
          <a href="#" className="Btn Btn--small Btn--primary Btn--inverted Btn--borderless">
            Edit
          </a>

          <a href="#" className="Btn Btn--small Btn--primary Btn--inverted Btn--borderless">
            Archive
          </a>

          <a href="#" className="Btn Btn--small Btn--primary Btn--inverted Btn--borderless">
            Delete
          </a>
        </div>
      </div>
    </div>
  </div>

export default PostCard;