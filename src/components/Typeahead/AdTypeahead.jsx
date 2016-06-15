import React, {Component, PropTypes} from 'react';
import Select from 'react-select';

export default class AdTypeahead extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  options = [
    { value: 1, label: 'For Sale' },
    { value: 2, label: 'Looking for' },
    { value: 3, label: 'Promo/Events' },
    { value: 4, label: 'For Rent' }
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
