import React, { Component } from 'react';
import linkState from 'react-link-state';
import {Link} from 'react-router';
import Switchbox from 'app/components/Switchbox';
import InputError from 'app/components/InputError';
import ButtonLoader from 'app/components/ButtonLoader';
import InputLocation from 'app/components/InputLocation';
import PostTypeSelect from 'app/components/PostTypeSelect';
import PostPreview from 'app/components/PostPreview';
import UploadWell from './UploadWell';

export default class CreatePostForm extends Component {
  state = {
    title: '',
    desc: '',
    price: 0.00,
    price_enabled: true,
    post_type: 1,
    mobile: '',
    location: '',
    photos: []
  };

  render() {
    const {auth, state} = this.props;

    return (
      <div>
        <form onSubmit={this.handle}>
          <div className="SidebarContainer-panelHeading">
            <div className="SidebarContainer-panelHeadingSection">
              <button onClick={this.handlePreview} type="button" className="Btn Btn--plain Btn--info">
                Preview Ad
              </button>
            </div>

            <div className="SidebarContainer-panelHeadingSection">
              <div className="SidebarContainer-panelHeadingSectionItem">
                {state.loading ? <div className="Spinner" /> : null}
              </div>

              <div className="SidebarContainer-panelHeadingSectionItem">
                <Link to="/manage-posts" className="Btn Btn--plain Btn--default">
                  Cancel
                </Link>
              </div>

              <div className="SidebarContainer-panelHeadingSectionItem">
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
                <InputLocation id="location" value={this.state.location} onChange={this.handleLocation} />
              </div>
            </div>

            <div className="Grid-cell u-size6">
              <div className="u-spacer-base">
                <UploadWell photos={this.state.photos} onChange={this.handleUpload} />
              </div>
            </div>
          </div>
        </form>

        <PostPreview
          ref="preview"
          product={this.state}
          auth={auth} />
      </div>
    );
  }

  handle = (evt) => {
    evt.preventDefault();

    const [latitude, longitude] = this.state.location.split(', ');
    const price = this.state.price_enabled ? parseFloat(this.state.price, 10) : 0;

    this.props.onPost({
      ...this.state,
      price,
      latitude,
      longitude
    });
  }

  handleUpload = (photos) => {
    this.setState({ photos });
  }

  handlePreview = () => {
    this.refs.preview.open();
  }

  handleType = (type) => {
    this.setState({ post_type: type });
  }

  handleLocation = (location) => {
    this.setState({ location });
  }
}
