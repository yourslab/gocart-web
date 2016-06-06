import React, { Component } from 'react';

export default class ViewablePasswordInput extends Component {
  state = {
    show: false
  };

  render() {
    const {show} = this.state;
    const {type, className, ...props} = this.props;

    return (
      <div className="FormInputGroup">
        <input type={show ? 'text' : 'password'} className="FormInputGroup-input" {...props} />

        <div className="FormInputGroup-addon">
          <button className="PlainBtn" type="button" onClick={this.handle}>
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    );
  }

  handle = () => {
    this.setState((state) => ({ show: !state.show }));
  }
}
