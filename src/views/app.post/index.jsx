import React, {Component} from 'react';
import axios from 'axios';
import flowRight from 'lodash/flowRight';
import linkState from 'react-link-state';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {resolve} from 'react-resolver';
import getPostType from 'app/utils/getPostType';
import formatCurrency from 'app/utils/formatCurrency';
import UserImg from 'app/components/UserImg';
import ProductImg from 'app/components/ProductImg';
import RatingWidget from 'app/components/RatingWidget';
import UserFollowWidget from 'app/components/UserFollowWidget';
import BumpButton from 'app/components/BumpButton';
import ProductBumpInfo from 'app/components/ProductBumpInfo';

class AppProductView extends Component {
  state = {
    product: this.props.product,

    comment: {
      data: [],
      offset: 0,
      loading: false
    },

    // Post new comment state
    post: {
      loading: false,
      error: false,
      input: ''
    },
  };

  componentDidMount() {
    if ( this.state.product.num_comments > 0 ) {
      this.handleGetComments();
    }

    this.refs.comment.focus();
  }

  render() {
    const {product, comment} = this.state;

    return (
      <div className="Container">
        <Helmet title={product.title} />

        <div className="ProductCardFull">
          <div className="ProductCardFull-thumbnail">
            <ProductImg src={product.photo_list[0]} id={product.id} className="ProductCardFull-thumbnailImage" alt="Thumbnail" />

            <div className="ProductCardFull-thumbnailOverlay">
              <div className="ProductCardFull-thumbnailOverlaySection">
                <h1 className="ProductCardFull-thumbnailOverlaySectionItem">{formatCurrency(product.price)}</h1>
              </div>

              <div className="ProductCardFull-thumbnailOverlaySection">
                <h5 className="ProductCardFull-thumbnailOverlaySectionItem">{product.num_likes} bumps</h5>
                <h5 className="ProductCardFull-thumbnailOverlaySectionItem">{product.num_comments} comments</h5>
              </div>
            </div>
          </div>

          <div className="ProductCardFull-panel">
            <div className="ProductCardFull-panelCanopy">
              <div className="ProductCardFull-panelCanopySection">
                <div className="ProductCardFull-panelCanopySectionItem">
                  <UserImg src={product.prof_pic_link} username={product.username} className="ProductCardFull-avatar" alt="Thumbnail" />
                </div>

                <div className="ProductCardFull-panelCanopySectionItem">
                  <h3 className="ProductCardFull-panelCanopyName">
                    <Link to={`/@${product.username}`} className="ProductCardFull-panelCanopyNameLink">
                      {product.name}
                    </Link>
                  </h3>

                  <RatingWidget score={product.avg_rating} />
                </div>
              </div>

              <div className="ProductCardFull-panelCanopySection">
                <UserFollowWidget
                  user={{ id: product.user_id, is_followed: product.is_followed }}
                  onFollow={this.handleFollow} />
              </div>
            </div>

            <div className="ProductCardFull-panelHeading">
              <div><small>{getPostType(product.post_type)}</small></div>
            </div>

            <h5 className="ProductCardFull-name">
              {product.title}
            </h5>

            <p className="ProductCardFull-description">
              {product.desc}
            </p>

            <BumpButton
              product={{ id: product.id, is_liked: product.is_liked }}
              onBump={this.handleBump} />

            <div className="ProductCardFull-commentInfo">
              <div className="CommentMeta">
                <div>
                  <a href="#" className="CommentMeta-highlight"><ProductBumpInfo product={product} /></a>
                </div>

                <div>
                  <span className="CommentMeta-count">{product.num_comments} comments</span>
                </div>
              </div>
            </div>

            {product.num_comments !== comment.data.length && product.num_comments > 0 && (comment.data.length > 0 && !product.loading)
              ? <button type="button" className="ProductCardFull-commentLoadMore" onClick={this.handleGetComments}>
                View {product.num_comments - comment.data.length} more comments
              </button> : null}

            <form onSubmit={this.handleComment}>
              <div className="CommentWidget">
                {}
                {comment.data.length ? <div className="CommentWidget-inner" ref="comment">
                  {comment.data.map((comment) =>
                    <div className="CommentWidget-item" key={`comment-${comment.id}`}>
                      <p>
                        <Link to={`/@${comment.username}`} className="CommentWidget-itemName">{comment.username}</Link>
                        &nbsp; {comment.comment_text}
                      </p>
                    </div>
                  )}
                </div> : <h4 className="CommentWidget-empty">Be the first one to comment</h4>}

                <div className="CommentWidget-form">
                  <input ref="comment" type="text" className="CommentWidget-input" placeholder="What do you have in mind?" valueLink={linkState(this, 'post.input')} />

                  <div>
                    <button className="Btn Btn--default Btn--borderless">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleGetComments = () => {
    if ( this.state.comment.loading ) {
      retun;
    }

    this.setState((state) => ({
      comment: {
        ...state.comment,
        loading: true
      }
    }));

    const {offset} = this.state.comment;

    return axios.get(`/post/${this.props.routeParams.id}/comments?start=${offset}&end=${offset + 19}`)
      .then((res) => {
        this.setState(({comment}) => ({
          comment: {
            ...comment,
            data: [...comment.data, ...res.data],
            offset: offset + 20,
            loading: false
          }
        }));

        return res;
      })
      .catch((res) => {
        this.setState((state) => ({
          comment: {
            ...state.comment,
            loading: false
          }
        }));

        return Promise.reject(res);
      });
  }

  handleComment = (evt) => {
    evt.preventDefault();

    if ( !this.state.post.input.length || this.state.post.loading ) {
      return;
    }

    this.setState((state) => ({
      post: {
        ...state.post,
        loading: true
      }
    }));

    return axios.post('/post/comments', {
        user_id: this.props.auth.id,
        post_id: this.state.product.id,
        comment_text: this.state.post.input
      })
      .then((res) => {
        this.setState((state) => ({
          product: {
            ...state.product,
            num_comments: state.product.num_comments + 1
          },

          comment: {
            ...state.comment,
            data: [{
              ...res.data,
              username: this.props.auth.username,
            }, ...state.comment.data]
          },

          post: {
            ...state.post,
            input: '',
            loading: false
          },
        }));

        if ( this.refs.comment ) {
          this.refs.comment.scrollTop = 0;
        }

        return res;
      })
      .catch((res) => {
        this.setState((state) => ({
          post: {
            ...state.post,
            loading: false
          }
        }));

        return Promise.reject(res);
      });
  }

  handleFollow = () => {
    this.setState((state) => ({
      product: {
        ...state.product,
        is_followed: !state.product.is_followed
      }
    }));
  }

  handleBump = () => {
    this.setState(({product}) => ({
      product: {
        ...product,
        is_liked: !product.is_liked,
        num_likes: product.num_likes + (product.is_liked ? -1 : 1)
      }
    }));
  }
}

export default flowRight(
  connect((state) => ({ auth: state.auth.user })),

  resolve('product', (props) =>
    axios.get(`/post/${props.routeParams.id}?viewer_id=${props.auth.id}`)
      .then((res) => res.data))
)(AppProductView);


