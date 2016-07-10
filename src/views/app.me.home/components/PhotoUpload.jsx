import React, {Component} from 'react';
import map from 'lodash/map';
import reader from 'app/utils/filereader';
import UserImg from 'app/components/UserImg';

export default class PhotoUpload extends Component {
	render() {
   return (
			<div className="AvatarUploadWidget u-spacer-base">
        <input type="file" ref="input" onChange={this.handle} className="AvatarUploadWidget-input" />

        <div className="AvatarUploadWidget-inner">
          <button type="button" className="PlainBtn" onClick={this.handleAdd}>
            <UserImg src={this.props.photo} username={this.props.username} className="AvatarUploadWidget-avatar" alt={`${this.props.username}'s Avatar`} />
          </button>

          <div>
            <button onClick={this.handleAdd} className="Btn Btn--info Btn--inverted Btn--small" type="button">
              Upload
            </button>
          </div>
        </div>
      </div>
		);
	}

  handleAdd = () => {
    this.refs.input.click();
  }

  handle = (evt) => {
    return reader(evt.target.files[0])
      .then((evt) => this.props.onChange(evt.target.result));
  }
}
