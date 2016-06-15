import React, {Component, PropTypes} from 'react';

export default class AdTypeTypeahead extends Component {
  render() {
    return (
      <select {...this.props}>
        <option value="1">For Sale</option>
        <option value="2">Looking for</option>
        <option value="3">Promo/Events</option>
        <option value="4">For Rent</option>
      </select>
    );
  }
}
