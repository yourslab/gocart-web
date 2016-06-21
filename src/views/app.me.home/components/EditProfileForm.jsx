import React, {Component} from 'react';
import linkState from 'react-link-state';
import {Link} from 'react-router';
import InputError from 'app/components/InputError';
import ButtonLoader from 'app/components/ButtonLoader';
import PhotoUpload from './PhotoUpload';

export default class EditProfileForm extends Component {
	state = {
		photo: '',
		username: '',
		email: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		website: '',
		bio: ''
	};

	render() {
		const {loading, errors} = this.props.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="SidebarContainer-panelHeading">
          <div className="SidebarContainer-panelHeadingSection" />

          <div className="SidebarContainer-panelHeadingSection">
            <div className="SidebarContainer-panelHeadingSectionItem">
              <Link to="/@srph" className="Btn Btn--default">
                Cancel
              </Link>
            </div>

            <div className="SidebarContainer-panelHeadingSectionItem">
              <ButtonLoader className="Btn Btn--info" loading={loading}>
                Save
              </ButtonLoader>
            </div>
          </div>
        </div>

        <div className="Grid">
          <div className="Grid-cell u-size6">
           	<PhotoUpload photo={this.state.photo} onChange={this.handleUpload} />

            <div className="FormGroup">
              <label htmlFor="username">Username</label>
              <InputError
                error={errors.username}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'username')}
                id="username" />
            </div>

            <div className="FormGroup">
              <label htmlFor="email">Email Address</label>
              <InputError
                error={errors.email}
                className="FormInput"
                type="email"
                valueLink={linkState(this, 'email')}
                id="email" />
            </div>

            <div className="FormGroup">
              <label htmlFor="first_name">First Name</label>
              <InputError
                error={errors.first_name}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'first_name')}
                id="first_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="middle_name">Middle Name</label>
              <InputError
                error={errors.middle_name}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'middle_name')}
                id="middle_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="last_name">Last Name</label>
              <InputError
                error={errors.last_name}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'last_name')}
                id="last_name" />
            </div>

            <div className="FormGroup">
              <label htmlFor="website">Website</label>
              <InputError
                error={errors.website}
                className="FormInput"
                type="text"
                valueLink={linkState(this, 'website')}
                id="website" />
            </div>

            <div className="FormGroup">
              <label htmlFor="bio">Bio</label>
              <InputError
                error={errors.bio}
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
                    <select className="FormInput" disabled>
                      <option>Select address type</option>
                      <option>Home Address</option>
                      <option>Office Address</option>
                    </select>
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                  	<input 
                  		type="text" 
                  		id="subdivision"
                  		className="FormInput" 
                  		placeholder="Unit No., Building / Subdivision" 
                  		disabled />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                  	<input 
                  		type="text" 
                  		id="barangay"
                  		className="FormInput" 
                  		placeholder="Street Name, Barangay" 
                  		disabled />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                  	<input 
                  		type="text" 
                  		id="city"
                  		className="FormInput" 
                  		placeholder="Town / City" 
                  		disabled />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
	                  <input 
                  		type="text" 
                  		id="province"
                  		className="FormInput" 
                  		placeholder="Province" 
                  		disabled />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <select className="FormInput" disabled>
                      <option>Philippines</option>
                    </select>
                  </div>

                  <div className="Grid">
                    <div className="Grid-cell u-size6">
                      <div className="FormGroup FormGroup--narrow">
                      	<input
                      		type="text"
                      		className="FormInput"
                      		id="state"
                      		placeholder="State" 
                      		disabled />
                      </div>
                    </div>

                    <div className="Grid-cell u-size6">
                      <div className="FormGroup FormGroup--narrow">
                      	<input
                      		type="text"
                      		className="FormInput"
                      		id="subdivision"
                      		placeholder="Subdivision" 
                      		disabled />
                      </div>
                    </div>
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <input
                  		type="text"
                  		className="FormInput"
                  		id="landmark"
                  		placeholder="Landmark(s)" 
                  		disabled />
                  </div>

                  <div className="FormGroup FormGroup--narrow">
                    <label>
                    	<input
                    		type="checkbox"
                    		id="default_address" 
                    		disabled />
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

		this.props.onPost(this.state);
	}

	handleUpload = (photo) => {
		this.setState({ photo })
	}
}