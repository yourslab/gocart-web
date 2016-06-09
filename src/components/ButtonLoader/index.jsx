import React from 'react';

const ButtonLoader = ({loading, children, ...props}) =>
  <button {...props}>
    {loading ? 'Loading...' : children}
  </button>

export default ButtonLoader;
