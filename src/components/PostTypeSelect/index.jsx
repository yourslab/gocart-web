import React, {Component, PropTypes} from 'react';
import getPostType from 'app/utils/getPostType';

const types = getPostType();

export default class PostTypeTypeahead extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  render() {
    return (
      <select {...this.props} onChange={this.handle}>
        <option value="">Select post type</option>

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
