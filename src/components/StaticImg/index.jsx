import React from 'react';
import img from 'app/utils/img';

const StaticImg = ({src, ...props}) =>
  <img src={img(src)} {...props} />

export default StaticImg;
