import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class AppManagePostsCreateView extends Component {
  render() {
    return (
      <div>
        <Helmet title="Create Post" />

        <div className="SidebarContainer-panelHeading">
          <div className="SidebarContainer-panelHeadingSection">
            <a href="#" className="Btn Btn--plain Btn--info">Preview Ad</a>
          </div>

          <div className="SidebarContainer-panelHeadingSection">
            <div className="SidebarContainer-panelHeadingSectionItem">
              <a href="#" className="Btn Btn--plain Btn--default">Cancel</a>
            </div>

            <div className="SidebarContainer-panelHeadingSectionItem">
              <a href="#" className="Btn Btn--inverted Btn--info">Save as draft</a>
            </div>

            <div className="SidebarContainer-panelHeadingSectionItem">
              <a href="#" className="Btn Btn--info">Publish</a>
            </div>
          </div>
        </div>

        <div className="Grid">
          <div className="Grid-cell u-size6">
            <div className="FormGroup">
              <label htmlFor="title">Post Title</label>
              <input type="text" id="title" className="FormInput" />
            </div>

            <div className="FormGroup">
              <label htmlFor="description">Post Description</label>
              <textarea id="description" className="FormInput" cols="5" />
            </div>

            <div className="FormGroup FormGroup--narrow">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" className="FormInput" />
            </div>

            <div className="FormGroup">
              <label>
                <input type="checkbox" id="no_price" />
                &nbsp;No Price
              </label>
            </div>

            <div className="FormGroup">
              <label htmlFor="category">Category</label>
              <input type="text" id="category" className="FormInput" />
            </div>

            <div className="FormGroup">
              <label htmlFor="ad_type">Type of ad</label>
              <input type="text" id="ad_type" className="FormInput" />
            </div>

            <div className="FormGroup">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" className="FormInput" />
            </div>

            <div className="FormGroup">
              <label htmlFor="ad_type">Location</label>
              <div className="FormInputGroup">
                <input type="text" id="ad_type" className="FormInputGroup-input" />
                <div className="FormInputGroup-button">
                  <button className="Btn Btn--info Btn--small">
                    Set Current Location
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="Grid-cell u-size6">
            <div className="Tab Tab--info u-spacer-base">
              <a href="#" className="Tab-item">
                Single Image
              </a>

              <a href="#" className="Tab-item Tab-item--active">
                Multiple Images
              </a>
            </div>

            <div className="UploadWell">
              <div className="UploadWell-item">
                <div className="UploadWell-itemOverlay">
                  <div>
                    <button className="PlainBtn">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="UploadWell-item">
                <div className="UploadWell-itemOverlay">
                  <div>
                    <button className="PlainBtn">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="UploadWell-item">
                <div className="UploadWell-itemOverlay">
                  <div>
                    <button className="PlainBtn">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
