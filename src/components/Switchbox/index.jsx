import React from 'react';

const Switchbox = ({type, ...props}) =>
  <label className="Switchbox">
    <input type="checkbox" {...props} />
    <span />
  </label>

export default Switchbox;
