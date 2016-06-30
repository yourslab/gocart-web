import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import range from 'lodash/range';
import map from 'lodash/map';
import slice from 'lodash/slice';
import reader from 'app/utils/filereader';
import removeBase64Prefix from 'app/utils/removeBase64Prefix';
import StaticImg from 'app/components/StaticImg';
import ProductImg from 'app/components/ProductImg';


export default class UploadWell extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    photos: PropTypes.array,
    // Product ID
    id: PropTypes.number
  };

  static defaultProps = {
    photos: []
  };

  state = {
    // List of photos being uploaded
    uploading: [],

    // List of photos being removed
    removing: []
  };

  render() {
    const {id, photos} = this.props;
    const {removing, uploading} = this.state;
    console.log(photos);

    return (
      <div className="UploadWell">
        <input type="file" ref="input" onChange={this.handle} className="UploadWell-input" multiple />

        {photos.map((photo, i) =>
          <div className="UploadWell-item" key={`photos-${photo}`}>
            <ProductImg src={photo} id={id} className="UploadWell-itemThumbnail" />

            {removing.indexOf(photo) === -1
              ? (
              <button type="button" className="UploadWell-itemRemove" onClick={this.handleRemove(photo)} title="Remove Photo">
                &times;
              </button>
            ) : <div className="UploadWell-itemRemoveOverlay" />}
          </div>
        )}

        {uploading.map((photo, i) =>
          <div className="UploadWell-item UploadWell-item--uploading" key={`uploading-${i}`}>
            <img src={photo} className="UploadWell-itemThumbnail" />
          </div>
        )}

        {range(3 - photos.length - uploading.length).map((_, i) =>
          <div className="UploadWell-item" key={`placeholder-${i}`}>
            <div className="UploadWell-itemOverlay">
              <div>
                <button type="button" className="PlainBtn" onClick={this.handleAdd} title="New Photo">
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
    if ( this.state.uploading.length + this.props.photos.length === 3 ) {
      return;
    }

    this.refs.input.click();
  }

  // @NOTE: We're not using index to indicate a photo
  // since we're also spawning an AJAX request to remove
  // the photo from the API. Because we can face issues
  // once the user simultaneously deletes all photos.
  // But this shouldn't be slow since in `edit`, we don't
  // store the base64 of the photo, but merely send it,
  // then store the responded filename
  handleRemove = (photo) => {
    return () => {
      this.setState(({removing}) => ({
        removing: [...removing, photo]
      }));

      const {id} = this.props;

      return axios.get(`/post/${id}/pics/-1/`)
        .then((res) => axios.delete(
          `/post/${id}/pics/${res.data.find((file) => file.link === photo).id}/`
        ))
        .then((res) => {
          this.setState(({removing}) => ({
            removing: removing.filter((file) => file !== photo)
          }));

          this.props.onChange(
            this.props.photos.filter((file) =>  file !== photo)
          );

          return res;
        });
    }
  }

  handle = (evt) => {
    const max = 3 - (this.state.uploading.length + this.props.photos.length);

    map(slice(evt.target.files, 0, max), (file) => {
      // Store the base64 photo for later access
      // (after the POST request)
      let photo;

      reader(file)
        .then((evt) => {
           photo = evt.target.result;

          this.setState(({uploading}) => ({
            uploading: [...uploading, photo]
          }));

          return axios.post(`/post/pics/`, {
            post_id: this.props.id,
            link: removeBase64Prefix(photo)
          })
        })
        .then((res) => {
          this.setState(({uploading}) => ({
            uploading: uploading.filter((file) => file !== photo)
          }));

          this.props.onChange([...this.props.photos, res.data.link]);

          return res;
        });
    });
  }
}
