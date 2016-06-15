import React, {Component, PropTypes} from 'react';
import Select from 'react-select';

export default class TagTypeahead extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  options = [
    { value: 1, label: 'shoes' },
    { value: 2, label: 'bags' },
    { value: 3, label: 'clothes' },
    { value: 4, label: 'accessories' }
  ];

  render() {
    const {value, multiple, onChange, allowCreate, ...props} = this.props;

    return <Select
      multiple
      allowCreate
      value={value}
      options={this.options}
      onChange={this.handle} />
  }

  handle = (value) => {
    this.props.onChange(value);
  }
}
