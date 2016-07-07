import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Helmet from 'react-helmet';
import isServerError from 'app/utils/isServerError';
import Infinite from 'app/components/Infinite';
import RatingWidget from 'app/components/RatingWidget';
import RatingCard from './components/RatingCard';

export default class AppProfileRatingsView extends Component {
  state = {
    ratings: [],
    offset: 0,
    loading: false,
    last: false,
    error: ''
  };

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    // Coming from `app.profile` route
    const {user} = this.props;
    const {ratings, loading} = this.state;

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

        <Infinite callback={this.handleRequest}>
          <div className="Grid">
            {ratings.map((rating) =>
              <RatingCard rating={rating} key={`rating-${rating.id}`} />
            )}
          </div>
        </Infinite>

        {loading ? <div className="Spinner" /> : null}
      </div>
    );
  }

  handleRequest = (offset = this.state.offset) => {
    if ( this.state.loading || this.state.last ) {
      return;
    }

    this.setState({
      loading: true,
      error: ''
    });

    const {state, props} = this;

    const query = qs.stringify({
      start: offset,
      end: offset + 19,
      type: 1
    });

    return axios.get(`/user/${props.user.id}/ratings?${query}`)
      .then((res) => {
        this.setState((state) => ({
          ratings: [...state.ratings, ...res.data],
          loading: false,
          offset: offset + 20
        }));

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
            loading: false,
            error: lang.errors.server
          });
        } else {
          this.setState({
            loading: false,
            last: true
          });
        }

        return Promise.reject(res);
      });
  }
}
