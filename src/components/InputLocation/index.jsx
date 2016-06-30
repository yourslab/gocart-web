import React, {Component, PropTypes} from 'react';
import ButtonLoader from 'app/components/ButtonLoader';

export default class InputLocation extends Component {
  static propTypes = {
    coordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }).isRequired,

    onChange: PropTypes.func.isRequired
  };

  state = {
    loading: false
  };

  render() {
    const {type, className, coordinates, onChange, ...props} = this.props;

    const displayedValue = coordinates.latitude || coordinates.longitude
      ? `${coordinates.latitude}, ${coordinates.longitude}`
      : '';

    return (
      <div className="FormInputGroup">
        <input type="text" className="FormInputGroup-input" value={displayedValue} readOnly {...props} />

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
        this.setState({ loading: false });
        this.props.onChange(coords);
      }, (error) => {
        this.setState({ loading: false });

        // @TODO: Add ui error-handling
        switch(error) {
          case error.PERMISSION_DENIED:
            console.warn('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.warn('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            console.warn('The request to get user location timed out.');
            break;
          case error.UNKNOWN_ERROR:
            console.warn('An unknown error occurred.');
            break;
        }
      });
    }
  }
}
