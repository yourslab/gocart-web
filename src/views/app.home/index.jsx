import React, {PropTypes} from 'react';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import Helmet from 'react-helmet';
import {Gateway} from 'react-gateway';
import {connect} from 'react-redux';
import Infinite from 'app/components/Infinite';
import ProductCard from 'app/components/ProductCard';
import StaticImg from 'app/components/StaticImg';
import Filters from './components/Filters';

class AppHomeView extends React.Component {
  state = {
    feed: [],
    offset: 0,
    filters: {
      // longtitude: 0,
      // latitude: 0,
      post_type: '',
      // distance: 0,
      // rating: 0,
      date: ''
    },

    loading: false,
    error: false
  };

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
    this.setState({ filters }, () => {
      this.handleRequest(0, filters)
    });
  }

  handleRequest = (offset = this.state.offset) => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    const {state, props} = this;
    const {date, post_type, ...filters} = state.filters;

    const dateFilter = date.length ? {
      from_date: moment(date, 'MM-DD-YYYY').unix(),
      to_date: moment().unix()
    } : {};

    const typeFilter = post_type.length ? { post_type } : {};

    const query = qs.stringify({
      ...filters,
      ...dateFilter,
      ...typeFilter,
      start: offset,
      end: offset + 19,
      type: 1
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
        this.setState({
          loading: false,
          error: true
        });

        return Promise.reject(res);
      });
  }
}

export default connect((state) => ({ auth: state.auth.user }))(AppHomeView);
