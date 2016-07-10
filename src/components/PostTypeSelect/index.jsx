import React, {Component, PropTypes} from 'react';
import getPostType from 'app/utils/getPostType';

const types = getPostType();

export default class PostTypeTypeahead extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    placeholder: 'Select post type'
  };

  render() {
    const {placeholder, onChange, ...props} = this.props;

    return (
      <select onChange={this.handle} {...props}>
        <option value="">{placeholder}</option>

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
