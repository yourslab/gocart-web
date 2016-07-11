import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Helmet from 'react-helmet';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import Infinite from 'app/components/Infinite';
import RatingWidget from 'app/components/RatingWidget';
import RatingCard from './components/RatingCard';
import RatingForm from './components/RatingForm';

// @NOTE: If you're looking on putting links to any of the user
// here towards directly their rating page, also implement the fix
// for: https://github.com/yourslab/gocart-web/issues/24
export default class AppProfileRatingsView extends Component {
  state = {
    ratings: {
      data: [],
      offset: 0,
      loading: false,
      last: false,
      error: ''
    },

    rate: {
      loading: false,
      errors: {},
      message: ''
    }
  };

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    // Coming from `app.profile` route
    const {auth, user} = this.props;
    const {ratings, rate} = this.state;

    return (
      <div>
        <Helmet title={`${user.username}'s Ratings`} />

        <div className="InfoWell u-size6 u-centerBlock u-spacer-base">
          <div className="InfoWell-section">
            <h5 className="InfoWell-sectionHeading">
              Overall Rating
            </h5>

            <button className="PlainBtn" onClick={() => auth.id !== user.id && this.refs.rating.open()}>
              <RatingWidget score={user.avg_rating} />
            </button>
          </div>

          <div className="InfoWell-section">
            <h5 className="InfoWell-sectionHeading">
              No. of reviews
            </h5>

            <h3 className="InfoWell-sectionText">{user.num_reviews} reviews</h3>
          </div>
        </div>

        <Infinite callback={this.handleRequest}>
          <div className="Grid">
            {ratings.data.map((rating) =>
              <RatingCard rating={rating} key={`rating-${rating.id}`} />
            )}
          </div>
        </Infinite>

        {ratings.loading ? <div className="Spinner" /> : null}

        <RatingForm
          ref="rating"
          state={rate}
          onRate={this.handleRate} />
      </div>
    );
  }

  handleRequest = (offset = this.state.ratings.offset) => {
    if ( this.state.ratings.loading || this.state.ratings.last ) {
      return;
    }

    this.setState(({ratings}) => ({
      ratings: {
        ...ratings,
        loading: true,
        error: ''
      }
    }));

    const query = qs.stringify({
      start: offset,
      end: offset + 19,
      type: 1
    });

    return axios.get(`/user/${this.props.user.id}/ratings?${query}`)
      .then((res) => {
        this.setState(({ratings}) => ({
          ratings: {
            ...ratings,
            data: [...ratings.data, ...res.data],
            loading: false,
            offset: offset + 20
          }
        }));

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState(({ratings}) => ({
            ratings: {
              ...ratings,
              loading: false,
              error: lang.errors.server
            }
          }));
        } else {
          this.setState(({ratings}) => ({
            ratings: {
              ...ratings,
              loading: false,
              last: true
            }
          }));
        }

        return Promise.reject(res);
      });
  }

  handleRate = (data) => {
    if ( this.state.rate.loading ) {
      return;
    }

    this.setState(({rate}) => ({
      rate: {
        ...rate,
        loading: true,
        errors: {},
        message: ''
      }
    }));

    return axios.post(`/user/ratings`, {
        ...data,
        to_user: this.props.user.id,
        from_user: this.props.auth.id
      })
      .then((res) => {
        this.setState((state) => ({
          ratings: {
            ...state.ratings,
            data: [{
              ...res.data,
              username: this.props.auth.username,
              prof_pic_link: this.props.auth.prof_pic_link
            }, ...state.ratings.data]
          },

          rate: {
            ...state.rate,
            loading: false
          }
        }));

        this.refs.rating.success();
        this.props.onReview(res.data.avg_rating);

        return res;
      })
      .catch((res) => {
        console.log(res);

        if ( isServerError(res.status) ) {
          this.setState(({rate}) => ({
            rate: {
              ...rate,
              loading: false,
              message: lang.errors.server
            }
          }));
        } else {
          this.setState(({rate}) => ({
            rate: {
              ...rate,
              loading: false,
              errors: formatValidationErrors(res.data.errors),
              message: lang.errors.input
            }
          }));
        }

        return Promise.reject(res);
      });
  }
}
