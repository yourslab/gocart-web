import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import lang from 'app/lang';
import config from 'app/config';
import ButtonLoader from 'app/components/ButtonLoader';

export default class InputLocation extends Component {
  static propTypes = {
    coordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired,

    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    value: ''
  };

  componentDidMount() {
    const {coordinates} = this.props;

    // Would most likely be used for "edit post"
    // where the coordinates data already exists
    if ( coordinates.latitude && coordinates.longitude ) {
      this.setState({ loading: true });

      this.geo(coordinates)
        .then((res) => {
          this.setState({
            loading: false,
            value: res.data.results[0].formatted_address
          });

          return res;
        })
        .catch((res) => {
          // This is a worst-case scenario
          // Not sure if this is the best way to handle this error.
          // This is an "edge-case" scenario because Google
          // rarely has any downtime, but can most likely happen
          // when the user doesn't have any connection (and it doesn't
          // make any sense haha).
          this.setState({
            loading: false,
            value: lang.errors.google
          });

          return Promise.reject(res);
        });
    }
  }

  render() {
    const {type, className, coordinates, value, onChange, ...props} = this.props;

    return (
      <div className="FormInputGroup">
        <input
          type="text"
          className="FormInputGroup-input"
          value={this.state.value}
          readOnly
          {...props} />

        <div className="FormInputGroup-button">
          <ButtonLoader loading={this.state.loading} type="button" className="Btn Btn--info Btn--small" onClick={this.handle}>
            Set Current Location
          </ButtonLoader>
        </div>
      </div>
    );
  }

  handle = () => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({ loading: true });

    if ( 'geolocation' in navigator ) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        return this.geo(coords)
          .then((res) => {
            this.setState({
              loading: false,
              value: res.data.results[0].formatted_address
            });

            this.props.onChange(coords);

            return res;
          })
          .catch((res) => {
            this.setState({ loading: false });
            this.props.onError(lang.errors.google);
            return Promise.reject(res);
          });
      }, (error) => {
        this.setState({ loading: false });

        switch(error.code) {
          case error.PERMISSION_DENIED:
            this.props.onError('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            this.props.onError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            this.props.onError('The request to get user location timed out.');
            break;
          case error.UNKNOWN_ERROR:
            this.props.onError('An unknown error occurred.');
            break;
        }
      });
    }
  }

  geo = ({latitude, longitude}) => {
    return axios({
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${config.google.appKey}`,
      method: 'get'
    });
  }
}
