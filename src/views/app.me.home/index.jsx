import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

export default class AppManagePostsCreateView extends Component {
  render() {
    return (
      <div>
        <Helmet title="Profile Settings" />

        <div className="SidebarContainer-panelHeading">
          <div className="SidebarContainer-panelHeadingSection" />

          <div className="SidebarContainer-panelHeadingSection">
            <div className="SidebarContainer-panelHeadingSectionItem">
              <Link to="/@srph" className="Btn Btn--default">
                Cancel
              </Link>
            </div>

            <div className="SidebarContainer-panelHeadingSectionItem">
              <button className="Btn Btn--info">
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="Grid">
          <div className="Grid-cell u-size6">
            <div className="AvatarUploadWidget u-spacer-base">
              <input className="AvatarUploadWidget-input" />

              <div className="AvatarUploadWidget-inner">
                <img src="https://placeimg.com/100/100/people" className="AvatarUploadWidget-avatar" alt="Avatar" />

                <div>
                  <button className="Btn Btn--info Btn--inverted Btn--small" type="button">
                    Upload
                  </button>
                </div>
              </div>
            </div>

            <div className="FormGroup">
              <label htmlFor="username">Username</label>
              <input type="text" className="FormInput" id="username" />
            </div>

            <div className="FormGroup">
              <label htmlFor="email">Email Address</label>
              <input type="email" className="FormInput" id="email" />
            </div>

            <div className="FormGroup">
              <label htmlFor="first_name">First Name</label>
              <input type="text" className="FormInput" id="first_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="middle_name">Middle Name</label>
              <input type="text" className="FormInput" id="middle_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" className="FormInput" id="last_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="website">Website</label>
              <input type="text" className="FormInput" id="website" />
            </div>

            <div className="FormGroup">
              <label htmlFor="bio">Bio</label>
              <textarea type="text" className="FormInput" id="bio" />
            </div>
          </div>

          <div className="Grid-cell u-size6">
            <div className="ListGroup">
              <h6 className="ListGroup-heading">Address</h6>

              <div className="ListGroup-item">
                <div className="ListGroup-itemHeading">
                  <h6 className="ListGroup-itemHeadingText">Home Address</h6>
                </div>
              </div>

              <div className="ListGroup-item ListGroup-item--open">
                <div className="ListGroup-itemHeading">
                  <h6 className="ListGroup-itemHeadingText">Office Address</h6>
                </div>

                <div className="ListGroup-itemPanel">
                  <div className="FormGroup FormGroup--narrow">
                    <select className="FormInput">
                      <option>Select address type</option>
                      <option>Home Address</option>
                      <option>Office Address</option>
                    </select>
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <input type="text" className="FormInput" placeholder="Unit No., Building / Subdivision" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <input type="text" className="FormInput" placeholder="Street Name, Barangay" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <input type="text" className="FormInput" placeholder="Town / City" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <input type="text" className="FormInput" placeholder="Province" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <select className="FormInput">
                      <option>Philippines</option>
                    </select>
                  </div>

                  <div className="Grid">
                    <div className="Grid-cell u-size6">
                      <div className="FormGroup FormGroup--narrow">
                        <input type="text" className="FormInput" placeholder="State" />
                      </div>
                    </div>

                    <div className="Grid-cell u-size6">
                      <div className="FormGroup FormGroup--narrow">
                        <input type="text" className="FormInput" placeholder="Postal Code" />
                      </div>
                    </div>
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <input type="text" className="FormInput" placeholder="Landmark(s)" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <label>
                      <input type="checkbox" />
                      &nbsp; Make this default addaress
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button className="Btn Btn--default">
              Add another address
            </button>
          </div>
        </div>
      </div>
    );
  }
}
