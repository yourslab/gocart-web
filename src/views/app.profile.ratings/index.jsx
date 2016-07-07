import React, { Component } from 'react';
import Helmet from 'react-helmet';
import RatingWidget from 'app/components/RatingWidget';

export default class AppProfileRatingsView extends Component {
  render() {
    const {user} = this.props;

    return (
      <div>
        <Helmet title={`${user.username}'s Ratings`} />

        <div className="InfoWell u-size6 u-centerBlock u-spacer-base">
          <div className="InfoWell-section">
            <h5 className="InfoWell-sectionHeading">
              Overall Rating
            </h5>

            <RatingWidget score={user.avg_rating} />
          </div>

          <div className="InfoWell-section">
            <h5 className="InfoWell-sectionHeading">
              No. of reviews
            </h5>

            <h3 className="InfoWell-sectionText">28 reviews</h3>
          </div>
        </div>

        <div className="Grid">
          <div className="Grid-cell u-size6 u-spacer-base">
            <div className="RatingCard">
              <div className="RatingCard-heading">
                <img className="RatingCard-avatar" src="https://placeimg.com/48/48/any" />

                <div className="RatingCard-info">
                  <h4 className="RatingCard-name">Alma Hamilton</h4>
                  <RatingWidget score={3} />
                </div>

                <div className="RatingCard-meta">
                  <small>06/22/2016</small>
                </div>
              </div>

              <p className="RatingCard-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="Spinne" />
      </div>
    );
  }
}
