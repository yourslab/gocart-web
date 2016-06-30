import React from 'react';
import {Link} from 'react-router';
import UserImg from 'app/components/UserImg';

const UserCard = ({user}) =>
  <div className="Grid-cell u-size4 u-spacer-base">
    <Link to={`/@${user.username}`} className="SearchUserCard">
      <div>
        <UserImg src={user.prof_pic_link} username={user.username} className="SearchUserCard-avatar" alt="Avatar" />
      </div>

      <div>
        <h4 className="SearchUserCard-title">{user.username}</h4>
        <h6 className="SearchUserCard-sub">{user.name}</h6>
      </div>
    </Link>
  </div>

export default UserCard;
