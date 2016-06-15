import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import range from 'lodash/range';
import map from 'lodash/map';
import reader from 'app/utils/filereader';
import slice from 'lodash/slice';
import StaticImg from 'app/components/StaticImg';

export default class UploadWell extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    photos: PropTypes.array
  };

  static defaultProps = {
    photos: []
  };

  render() {
    const {photos} = this.props;

    return (
      <div className="UploadWell">
        <input type="file" ref="input" onChange={this.handle} className="UploadWell-input" multiple />

        {photos.map((photo, i) =>
          <div className="UploadWell-item" key={i}>
            <img src={photo} className="UploadWell-itemThumbnail" />

            <button type="button" className="UploadWell-itemRemove" onClick={this.handleRemove(i)}>
              &times;
            </button>
          </div>
        )}

        {range(3 - photos.length).map((_, i) =>
          <div className="UploadWell-item" key={i}>
            <div className="UploadWell-itemOverlay">
              <div>
                <button type="button" className="PlainBtn" onClick={this.handleAdd}>
                  <StaticImg src="icons/uploadplus.svg" alt="+" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  handleAdd = () => {
    this.refs.input.click();
  }

  handleRemove = (index) => {
    return () => {
      this.props.onChange(
        this.props.photos.filter((_, i) =>  i !== index)
      );
    }
  }

  handle = (evt) => {
    map(slice(evt.target.files, 0, 3), (file) => {
      reader(file).then((evt) => {
        this.props.onChange([...this.props.photos, evt.target.result]);
      });
    });
  }
}
