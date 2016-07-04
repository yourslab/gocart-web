import React, {Component} from 'react';
import axios from 'axios';
import flowRight from 'lodash/flowRight';
import linkState from 'react-link-state';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {resolve} from 'react-resolver';
import formatCurrency from 'app/utils/formatCurrency';
import UserImg from 'app/components/UserImg';
import RatingWidget from 'app/components/RatingWidget';
import UserFollowWidget from 'app/components/UserFollowWidget';

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
  }

  render() {
    const {product, comment} = this.state;

    return (
      <div className="Container">
        <Helmet title={product.title} />

        <div className="ProductCardFull">
          <div className="ProductCardFull-thumbnail">
            <img className="ProductCardFull-thumbnailImage" alt="Thumbnail" />

            <div className="ProductCardFull-thumbnailOverlay">
              <div className="ProductCardFull-thumbnailOverlaySection">
                <h1 className="ProductCardFull-thumbnailOverlaySectionItem">P {formatCurrency(product.price)}</h1>
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
                  <h2 className="ProductCardFull-panelCanopyName">
                    <Link to={`/@${product.username}`} className="ProductCardFull-panelCanopyNameLink">
                      {product.username}
                    </Link>
                  </h2>

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
              <div><h5 className="ProductCardFull-name">{product.title}</h5></div>
            </div>

            <p className="ProductCardFull-description">
              {product.description}
            </p>

            <div className="ProductCardFull-commentInfo">
              <div className="CommentMeta">
                <div>
                  <a href="#" className="CommentMeta-highlight">{product.num_likes} bumped this</a>
                </div>

                <div>
                  <span className="CommentMeta-count">{product.num_comments} comments</span>
                </div>
              </div>
            </div>

            {product.num_comments !== comment.data.length && product.num_comments > 0
              ? <a href="#" className="ProductCardFull-commentLoadMore">
                View {product.num_comments - comment.data.length} more comments
              </a> : null}

            <form onSubmit={this.handleComment}>
              <div className="CommentWidget">
                {comment.data.length ? <div className="CommentWidget-inner" ref="comment">
                  {comment.data.map((comment) =>
                    <div className="CommentWidget-item" key={`comment-${comment.id}`}>
                      <p>
                        <Link to={`/@${comment.username}`} className="CommentWidget-itemName">{comment.username}</Link>
                        &nbsp; {comment.comment_text}
                      </p>
                    </div>
                  )}
                </div> : null}

                <div className="CommentWidget-form">
                  <input type="text" className="CommentWidget-input" placeholder="What do you have in mind?" valueLink={linkState(this, 'post.input')} />

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
        this.setState((state) => ({
          comment: {
            ...state.comment,
            data: res.data,
            offset: offset + 20
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
}

export default flowRight(
  resolve('product', (props) =>
    axios.get(`/post/${props.routeParams.id}`)
      .then((res) => res.data)),

  connect((state) => ({ auth: state.auth.user }))
)(AppProductView);
