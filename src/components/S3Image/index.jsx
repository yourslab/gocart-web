import React, {PropTypes} from 'react';
import getS3Img from 'app/utils/getS3Img';

const S3Image = ({src, username, ...props}) =>
  <img src={getS3Img(username, src)} {...props} />

S3Image.propTypes = {
  username: PropTypes.string.isRequired
};

export default S3Image;
