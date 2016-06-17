import React, {Component, PropTypes} from 'react';
import getAdType from 'app/utils/getAdType';

const types = getAdType();

export default class AdTypeTypeahead extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  render() {
    return (
      <select {...this.props} onChange={this.handle}>
        {types.map((type, i) =>
          <option value={type.id} key={i}>
            {type.label}
          </option>
        )}
      </select>
    );
  }

  handle = (evt) => {
    this.props.onChange(evt.target.value);
  }
}
