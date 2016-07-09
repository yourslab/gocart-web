import React, {PropTypes} from 'react';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import Helmet from 'react-helmet';
import {Gateway} from 'react-gateway';
import {connect} from 'react-redux';
import isServerError from 'app/utils/isServerError';
import Infinite from 'app/components/Infinite';
import ProductCard from 'app/components/ProductCard';
import StaticImg from 'app/components/StaticImg';
import Filters from './components/Filters';

class AppHomeView extends React.Component {
  state = {
    feed: [],
    offset: 0,
    last: false,
    filters: {
      // longtitude: 0,
      // latitude: 0,
      post_type: '',
      price: [0, 100000],
      // distance: 0,
      rating: [0, 5],
      date: ''
    },

    loading: false,
    error: false
  };

  componentWillReceiveProps(nextProps) {
    if ( this.props.location.query.relevance === nextProps.location.query.relevance ) {
      return;
    }

    // We're doing a string "fall-back" because
    // handleRequest sets `query.relevance` to the the old (old in this method)
    // relevance (`this.props.location.query.relevance`).
    // The `relevance` property is undefined for `popular` tab (the default tab).
    this.handleRequest(0, nextProps.location.query.relevance || '');
  }

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    const {feed, loading, filters} = this.state;

    return (
      <div className="Container">
        <Helmet title="Home" />

        <Gateway into="header-separator">
          <div className="MainHeader-separator" />
        </Gateway>

        <Gateway into="header-filters">
          <button className="MainHeader-button" onClick={() => this.refs.filters.open()}>
            More Filters
            <StaticImg className="MainHeader-buttonIcon" src="icons/caret_dropdown_red.svg" alt="Filter Icon" />
          </button>
        </Gateway>

        <div className="u-spacer-large">
          <Infinite callback={this.handleRequest}>
            <div className="Grid">
              {feed.map((product, i) =>
                <div className="Grid-cell u-size6 u-spacer-large" key={product.id}>
                  <ProductCard
                    product={product}
                    onFollow={this.handleFollow} />
                </div>
              )}
            </div>
          </Infinite>
        </div>

        {loading ? <div className="Spinner u-spacer-base" /> : null}

        <Filters ref="filters"
          filters={filters}
          onFilter={this.handleFilter} />
      </div>
    );
  }

  handleFollow = (id) => {
    this.setState((state) => ({
      feed: state.feed.map((product) => product.user_id === id
        ? {
          ...product,
          is_followed: !product.is_followed
        } : product)
    }));
  }

  handleFilter = (filters) => {
    // @TODO: Batch updating of `filters`
    // by setting it on `handleRequest` itself.
    this.setState({ filters }, () => {
      this.handleRequest(0);
    });
  }

  handleRequest = (offset = this.state.offset, relevance = this.props.location.query.relevance) => {
    if ( this.state.loading || (this.state.last && offset !== 0)  ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    const {state, props} = this;
    const {date, post_type, price, rating, ...filters} = state.filters;

    const dateFilter = date.length ? {
      from_date: moment(date, 'MM-DD-YYYY').unix(),
      to_date: moment().unix()
    } : {};

    // `post_type` filter
    const typeFilter = post_type.length ? { post_type } : {};

    const query = qs.stringify({
      ...filters,
      ...dateFilter,
      ...typeFilter,
      from_price: price[0],
      to_price: price[1],
      from_rating: rating[0],
      to_rating: rating[1],
      start: offset,
      end: offset + 19,
      // @REFACTOR: Make a convenience method
      // Following: 1
      // Popular: 5
      // Nearby: 0
      type: relevance === 'following'
        ? 1
        : (relevance === 'nearby' ? 0 : 5)
    });

    return axios.get(`/user/${props.auth.id}/feed/posts?${query}`)
      .then((res) => {
        this.setState((state) => ({
          feed: offset === 0
            ? res.data
            : [...state.feed, ...res.data],
          loading: false,
          offset: offset + 20
        }));

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
            loading: false,
            error: true
          });
        } else if (offset === 0) {
          this.setState({
            feed: [],
            last: true,
            loading: false
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

export default connect((state) => ({ auth: state.auth.user }))(AppHomeView);
