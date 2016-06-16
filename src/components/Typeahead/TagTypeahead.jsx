import React, {Component, PropTypes} from 'react';
import Select from 'react-select';

/**
 * @TODO: Handle when two similar tags are input
 */
export default class TagTypeahead extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  options = [
    { value: 'shoes', label: 'shoes' },
    { value: 'bags', label: 'bags' },
    { value: 'clothes', label: 'clothes' },
    { value: 'accessories', label: 'accessories' }
  ];

  render() {
    const {value, multi, onChange, options, allowCreate, ...props} = this.props;

    return <Select
      multi
      value={value}
      options={this.options}
      onChange={this.props.onChange}
      placeholder="shoes, bag, clothes, etc."
      {...props} />
  }
}
