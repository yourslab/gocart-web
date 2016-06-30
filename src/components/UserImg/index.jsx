import React, {PropTypes} from 'react';
import getUserImg from 'app/utils/getUserImg';

const UserImg = ({src, username, ...props}) =>
  <img src={getUserImg(username, src)} {...props} />

UserImg.propTypes = {
  username: PropTypes.string.isRequired
};

export default UserImg;
