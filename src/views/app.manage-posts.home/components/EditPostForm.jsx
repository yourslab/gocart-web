import React, { Component } from 'react';
import linkState from 'react-link-state';
import {Link} from 'react-router';
import removeBase64Prefix from 'app/utils/removeBase64Prefix';
import Modal from 'app/components/Modal';
import Switchbox from 'app/components/Switchbox';
import InputError from 'app/components/InputError';
import ButtonLoader from 'app/components/ButtonLoader';
import InputLocation from 'app/components/InputLocation';
import PostTypeSelect from 'app/components/PostTypeSelect';
import PostPreview from 'app/components/PostPreview';
import UploadWell from './UploadWell';

export default class EditPostForm extends Component {
  state = {
    title: '',
    desc: '',
    price: 0.00,
    price_enabled: true,
    post_type: 1,
    mobile: '',
    latitude: 0,
    longitude: 0
  };

  componentWillReceiveProps(nextProps) {
    if ( nextProps.state.editing === this.props.state.editing ) {
      return;
    }

    if ( nextProps.state.editing ) {
      this.refs.modal.open();

      this.setState({
        ...nextProps.product,
        price_enabled: nextProps.product.price >= 1,
      });
    } else {
      this.refs.modal.close();
    }
  }

  render() {
    const {auth, product, state, onCancelEdit} = this.props;

    return (
      // 998: container width; 164 - sidebar width
      // Imitate create post page panel width
      <Modal size={998 - 164} ref="modal" onClose={onCancelEdit}>
        <div>
          <form onSubmit={this.handle}>
            <div className="ActionMenu u-spacer-base">
              <div className="ActionMenu-section">
                <button onClick={this.handlePreview} type="button" className="Btn Btn--plain Btn--info">
                  Preview Ad
                </button>
              </div>

              <div className="ActionMenu-section">
                <div className="ActionMenu-sectionItem">
                  {state.loading ? <div className="Spinner" /> : null}
                </div>

                <div className="ActionMenu-sectionItem">
                  <Link to="/manage-posts" className="Btn Btn--plain Btn--default">
                    Cancel
                  </Link>
                </div>

                <div className="ActionMenu-sectionItem">
                  <ButtonLoader loading={state.loading} className="Btn Btn--info">
                    Publish
                  </ButtonLoader>
                </div>
              </div>
            </div>

            <div className="Grid">
              <div className="Grid-cell u-size6">
                <div className="FormGroup">
                  <label htmlFor="title">Post Title</label>
                  <InputError type="text" id="title" className="FormInput" valueLink={linkState(this, 'title')} error={state.errors.title} />
                </div>

                <div className="FormGroup">
                  <label htmlFor="description">Post Description</label>
                  <InputError element={<textarea id="description" className="FormInput" cols="5" valueLink={linkState(this, 'desc')} />} error={state.errors.desc} />
                </div>

                <div className="FormGroup FormGroup--narrow">
                  <div className="Grid">
                    <div className="Grid-cell u-size6">
                      <label htmlFor="price">Price</label>
                    </div>

                    <div className="Grid-cell u-size6">
                      <div className="u-pullRight">
                        <Switchbox checkedLink={linkState(this, 'price_enabled')} />
                      </div>
                    </div>
                  </div>

                  <InputError type="number" id="price" className="FormInput" valueLink={linkState(this, 'price')} error={state.errors.price} disabled={!this.state.price_enabled} />
                </div>

                <div className="FormGroup">
                  <label htmlFor="post_type">Type of ad</label>
                  <PostTypeSelect id="post_type" className="FormInput" value={this.state.post_type} onChange={this.handleType} />
                </div>

                <div className="FormGroup">
                  <label htmlFor="mobile">Mobile Number</label>
                  <InputError type="text" id="mobile" className="FormInput" valueLink={linkState(this, 'mobile')} error={state.errors.mobile} />
                </div>

                <div className="FormGroup">
                  <label htmlFor="location">Location</label>
                  <InputError
                    element={<InputLocation id="location" coordinates={{ latitude: this.state.latitude, longitude: this.state.longitude }} onChange={this.handleLocation} />}
                    error={state.errors.latitude || state.errors.longitude}
                    classNameModifier="FormInputGroup--danger" />
                </div>
              </div>

              <div className="Grid-cell u-size6">
                <div className="u-spacer-small">
                  <UploadWell
                    id={product.id}
                    photos={this.props.product.photo_list}
                    onChange={this.handleUpload} />
                </div>

                {state.errors.photos ? <div className="InfoDetails InfoDetails--danger u-spacer-base">{state.errors.photos}</div> : null}
              </div>
            </div>
          </form>

          <PostPreview
            ref="preview"
            product={this.state}
            auth={auth} />
        </div>
      </Modal>
    );
  }

  handle = (evt) => {
    evt.preventDefault();

    const {price, price_enabled, ...state} = this.state;

    this.props.onUpdate({
      ...state,
      price: price_enabled ? parseFloat(price, 10) : 0
    });
  }

  handleUpload = (photos) => {
    this.props.onUpload(this.props.product.id, photos);
  }

  handlePreview = () => {
    this.refs.preview.open();
  }

  handleType = (type) => {
    this.setState({ post_type: type });
  }

  handleLocation = ({longitude, latitude}) => {
    this.setState({ longitude, latitude });
  }
}
