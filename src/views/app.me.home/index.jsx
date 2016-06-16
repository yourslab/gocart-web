import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import linkState from 'react-link-state';
import axios from 'axios';
import InputError from 'app/components/InputError';
import ButtonLoader from 'app/components/ButtonLoader';

export default class AppManagePostsCreateView extends Component {
  state = {
    loading: false,
    error: false,
    messages: '',
    username: '',
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    website: '',
    bio: '',
    subdivision: '',
    barangay: '',
    city: '',
    province: '',
    state: '',
    postal_code: '',
    landmark: '',
    default_address: false
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
              <ButtonLoader className="Btn Btn--info" loading={this.state.loading}>
                Save
              </ButtonLoader>
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
              <InputError
                error={this.state.messages}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'username')}
                id="username" />
            </div>

            <div className="FormGroup">
              <label htmlFor="email">Email Address</label>
              <InputError
                error={this.state.messages}
                className="FormInput"
                type="email"
                valueLink={linkState(this, 'email')}
                id="email" />
            </div>

            <div className="FormGroup">
              <label htmlFor="first_name">First Name</label>
              <InputError
                error={this.state.messages}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'first_name')}
                id="first_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="middle_name">Middle Name</label>
              <InputError
                error={this.state.messages}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'middle_name')}
                id="middle_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="last_name">Last Name</label>
              <InputError
                error={this.state.messages}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'last_name')}
                id="last_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="website">Website</label>
              <InputError
                error={this.state.messages}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'website')}
                id="website" />
            </div>

            <div className="FormGroup">
              <label htmlFor="bio">Bio</label>
              <InputError
                error={this.state.messages}
                element={<textarea className="FormInput" />}
                valueLink={linkState(this, 'bio')}
                id="bio" />
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
                    <InputError
                      error={this.state.messages}
                      className="FormInput"
                      type="text"
                      valueLink={linkState(this, 'subdivision')}
                      id="subdivision" 
                      placeholder="Unit No., Building / Subdivision" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <InputError
                      error={this.state.messages}
                      className="FormInput"
                      type="text"
                      valueLink={linkState(this, 'barangay')}
                      id="barangay" 
                      placeholder="Street Name, Barangay" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <InputError
                      error={this.state.messages}
                      className="FormInput"
                      type="text"
                      valueLink={linkState(this, 'city')}
                      id="city" 
                      placeholder="Town / City" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                  <InputError
                      error={this.state.messages}
                      className="FormInput"
                      type="text"
                      valueLink={linkState(this, 'province')}
                      id="province" 
                      placeholder="Province" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <select className="FormInput">
                      <option>Philippines</option>
                    </select>
                  </div>

                  <div className="Grid">
                    <div className="Grid-cell u-size6">
                      <div className="FormGroup FormGroup--narrow">
                        <InputError
                          error={this.state.messages}
                          className="FormInput"
                          type="text"
                          valueLink={linkState(this, 'state')}
                          id="state" 
                          placeholder="State" />
                      </div>
                    </div>

                    <div className="Grid-cell u-size6">
                      <div className="FormGroup FormGroup--narrow">
                        <InputError
                          error={this.state.messages}
                          className="FormInput"
                          type="text"
                          valueLink={linkState(this, 'subdivision')}
                          id="subdivision" 
                          placeholder="postal_code" />
                      </div>
                    </div>
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <InputError
                      error={this.state.messages}
                      className="FormInput"
                      type="text"
                      valueLink={linkState(this, 'landmark')}
                      id="landmark" 
                      placeholder="Landmarks(s)" />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <label>
                      <InputError
                        type="checkbox"
                        checkedLink={linkState(this, 'default_address')}
                        id="default_address" />
                      &nbsp; Make this default address
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
      </form>
    );
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    axios.put('/user', this.state)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
      
    setTimeout(() => {
      this.setState({
        loading: false,
        error: false
      })
    }, 1500);
  }
}
