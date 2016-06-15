import React, { Component } from 'react';
import linkState from 'react-link-state';
import Switchbox from 'app/components/Switchbox';
import InputError from 'app/components/InputError';
import ButtonLoader from 'app/components/ButtonLoader';
import InputLocation from 'app/components/InputLocation';
import {AdTypeahead, TagTypeahead} from 'app/components/Typeahead';
import PostPreview from 'app/components/PostPreview';
import UploadWell from './UploadWell';

export default class CreatePostForm extends Component {
  state = {
    title: '',
    description: '',
    price: '',
    price_enabled: true,
    category: '',
    ad_type: '',
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
                <a href="#" className="Btn Btn--plain Btn--default">Cancel</a>
              </div>

              <div className="SidebarContainer-panelHeadingSectionItem">
                <a href="#" className="Btn Btn--inverted Btn--info">Save as draft</a>
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
                <InputError element={<textarea id="description" className="FormInput" cols="5" valueLink={linkState(this, 'description')} />} error={state.errors.description} />
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
                <label htmlFor="category">Category</label>
                <InputError type="text" id="category" className="FormInput" valueLink={linkState(this, 'category_id')} error={state.errors.category_id} />
              </div>

              <div className="FormGroup">
                <label htmlFor="ad_type">Type of ad</label>
                <InputError type="text" id="ad_type" className="FormInput" valueLink={linkState(this, 'ad_type')} error={state.errors.ad_type} />
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
              <UploadWell photos={this.state.photos} onChange={this.handleUpload} />
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
    this.props.onPost(this.state);
  }

  handleUpload = (photos) => {
    this.setState({ photos });
  }

  handlePreview = () => {
    this.refs.preview.open();
  }

  handleLocation = (location) => {
    console.log(location);
    this.setState({ location });
  }
}
