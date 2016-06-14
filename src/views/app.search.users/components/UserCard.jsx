import React from 'react';
import {Link} from 'react-router';

const UserCard = () =>
  <div className="Grid-cell u-size4 u-spacer-base">
    <Link to="/@srph" className="SearchUserCard">
      <div>
        <img src="https://placeimg.com/50/50/people" className="SearchUserCard-avatar" alt="Avatar" />
      </div>

      <div>
        <h4 className="SearchUserCard-title">joelspolsky</h4>
        <h6 className="SearchUserCard-sub">Joel Spolsky</h6>
      </div>
    </Link>
  </div>

export default UserCard;
