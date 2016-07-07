import React from 'react';
import moment from 'moment';
import UserImg from 'app/components/UserImg';
import RatingWidget from 'app/components/RatingWidget';

const RatingCard = ({rating}) =>
  <div className="Grid-cell u-size6 u-spacer-base">
    <div className="RatingCard">
      <div className="RatingCard-heading">
        <UserImg className="RatingCard-avatar" src={rating.prof_pic_link} username={rating.username} />

        <div className="RatingCard-info">
          <h4 className="RatingCard-name">{rating.username}</h4>
          <RatingWidget score={rating.rating_num} />
        </div>

        <div className="RatingCard-meta">
          <small>{moment.unix(rating.time_rated).format('MM/DD/YYYY')}</small>
        </div>
      </div>

      <p className="RatingCard-text">
        {rating.rating_text}
      </p>
    </div>
  </div>

export default RatingCard;
