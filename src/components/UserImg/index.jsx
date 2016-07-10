import React, {PropTypes} from 'react';
import getUserImg from 'app/utils/getUserImg';
import StaticImg from 'app/components/StaticImg';

const UserImg = ({src, username, ...props}) =>
  src == null
    ? <StaticImg src="avatar.svg" {...props} />
    : <img src={getUserImg(username, src)} {...props} />

UserImg.propTypes = {
  username: PropTypes.string.isRequired
};

export default UserImg;
