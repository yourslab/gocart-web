import React, {Component} from 'react';
import map from 'lodash/map';
import reader from 'app/utils/filereader';
import StaticImg from 'app/components/StaticImg';

export default class PhotoUpload extends Component {
	render() {
   return (
			<div className="AvatarUploadWidget u-spacer-base">
        <input type="file" ref="input" onChange={this.handle} className="AvatarUploadWidget-input" />

        <div className="AvatarUploadWidget-inner">
          <button type="button" className="PlainBtn" onClick={this.handleAdd}>
            {this.props.photo.length
              ? <img src={this.props.photo} className="AvatarUploadWidget-avatar" alt="Avatar" />
              : <StaticImg src="icons/gocartlogo_red_small@1x.png" className="AvatarUploadWidget-avatar" alt="Avatar" />
            }
          </button>

          <div>
            <button className="Btn Btn--info Btn--inverted Btn--small" type="button">
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
    map(evt.target.files, (file) => {
      reader(file).then((evt) => {
        this.props.onChange(evt.target.result);
      });
    });
  }
}