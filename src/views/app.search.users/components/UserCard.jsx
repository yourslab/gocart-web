import React from 'react';
import {Link} from 'react-router';

const UserCard = ({user}) =>
  <div className="Grid-cell u-size4 u-spacer-base">
    <Link to={`/@${user.username}`} className="SearchUserCard">
      <div>
        <img src="https://placeimg.com/50/50/people" className="SearchUserCard-avatar" alt="Avatar" />
      </div>

      <div>
        <h4 className="SearchUserCard-title">{user.username}</h4>
        <h6 className="SearchUserCard-sub">{user.name}</h6>
      </div>
    </Link>
  </div>

export default UserCard;
