import React, {Component, PropTypes} from 'react';
import addClass from 'dom-helpers/class/addClass';
import removeClass from 'dom-helpers/class/removeClass';
import {Gateway} from 'react-gateway';
import ClickOutside from 'react-click-outside';
import formatCurrency from 'app/utils/formatCurrency';
import getProductPhotos from 'app/utils/getProductPhotos';
import StaticImg from 'app/components/StaticImg';
import UserImg from 'app/components/UserImg';
import ProductImg from 'app/components/ProductImg';

/**
 * @REFACTOR Make a very plain modal component (all it does
 * is work on accessibility and mounting/whatever)
 * @see https://gist.github.com/ryanflorence/fd7e987c832cc4efaa56
 *
 * @todo onClose and onOpen transitions
 */
export default class PostPreview extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  state = {
    open: false
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
  }

  render() {
    const {auth, product} = this.props;

    return this.state.open ? (
      <Gateway into="global">
        <div className="ProductPreviewModal">
          <div className="Container">
            <ClickOutside onClickOutside={this.handleClickOutside}>
              <div className="ProductPreviewModal-body">
                <div className="ProductPreviewModal-close">
                  <button type="button" className="Btn Btn--clean Btn--large" onClick={this.close}>
                    Close Preview
                  </button>
                </div>

                <div className="ProductCardFull">
                  <div className="ProductCardFull-thumbnail">
                    <ProductImg src={getProductPhotos(product)[0]} id={product.id} className="ProductCardFull-thumbnailImage" alt="Thumbnail" />

                    <div className="ProductCardFull-thumbnailOverlay">
                      <div className="ProductCardFull-thumbnailOverlaySection">
                        <h1 className="ProductCardFull-thumbnailOverlaySectionItem">P {product.price_enabled ? formatCurrency(product.price) : '0.00'}</h1>
                      </div>

                      <div className="ProductCardFull-thumbnailOverlaySection">
                        <h5 className="ProductCardFull-thumbnailOverlaySectionItem">0 bumps</h5>
                        <h5 className="ProductCardFull-thumbnailOverlaySectionItem">0 comments</h5>
                      </div>
                    </div>
                  </div>

                  <div className="ProductCardFull-panel">
                    <div className="ProductCardFull-panelCanopy">
                      <div className="ProductCardFull-panelCanopySection">
                        <div className="ProductCardFull-panelCanopySectionItem">
                          <UserImg src={auth.prof_pic_link} username={auth.username} className="ProductCardFull-avatar" alt="Thumbnail" />
                        </div>

                        <div className="ProductCardFull-panelCanopySectionItem">
                          <h2 className="ProductCardFull-panelCanopyName">{auth.name}</h2>
                        </div>
                      </div>
                    </div>

                    <div className="ProductCardFull-panelHeading">
                      <div><h5 className="ProductCardFull-name">{product.title || <em>Untitled</em>}</h5></div>
                    </div>

                    <p className="ProductCardFull-description">
                      {product.desc || <em>Enter a description here...</em>}
                    </p>

                    <div className="ProductCardFull-commentInfo">
                      <div className="CommentMeta">
                        <div>
                          <a href="#" className="CommentMeta-highlight">0 bumps</a>
                        </div>

                        <div>
                          <span className="CommentMeta-count">0 comments</span>
                        </div>
                      </div>
                    </div>

                    <div className="CommentWidget">
                      <h4 className="CommentWidget-empty">
                        Be the first one to comment
                      </h4>

                      <div className="CommentWidget-form">
                        <input type="text" className="CommentWidget-input" placeholder="Add comment..." />

                        <div>
                          <button type="button" className="Btn Btn--default Btn--borderless">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ClickOutside>
          </div>
        </div>
      </Gateway>
    ) : null;
  }

  open = () => {
    this.setState({ open: true }, () => {
      addClass(document.body, 'ProductPreviewModalBody');
    });
  }

  close = () => {
    this.setState({ open: false }, () => {
      removeClass(document.body, 'ProductPreviewModalBody');
    });
  }

  handleEscape = (evt) => {
    const key = evt.which || evt.keyCode;

    if ( this.state.open && key === 27 ) {
      this.close();
    }
  }

  handleClickOutside = () => {
    this.close();
  }
}
