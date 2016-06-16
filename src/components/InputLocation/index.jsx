import React, {Component} from 'react';
import ButtonLoader from 'app/components/ButtonLoader';

export default class InputLocation extends Component {
  state = {
    loading: false
  };

  render() {
    const {type, className, ...props} = this.props;

    return (
      <div className="FormInputGroup">
        <input type="text" className="FormInputGroup-input" {...props} />

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

        this.props.onChange(`${coords.latitude}, ${coords.longitude}`);
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
