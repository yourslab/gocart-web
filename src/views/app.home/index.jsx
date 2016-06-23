import React, {PropTypes} from 'react';
import axios from 'axios';
import qs from 'qs';
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
      longtitude: 0,
      latitude: 0,
      type: 0,
      distance: 0,
      rating: 0
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
                <div className="Grid-cell u-size6 u-spacer-large" key={i}>
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

  // @TODO: Discuss with the team with possible scenarios
  // we'll cover in case user tries to unfollow a user
  // in his feed. It's also possible that there will be no bugs
  // as long as "unfollow" only removes newer posts of that user
  // to the auth's feed.
  // @see https://trello.com/c/1UFlbWMW/21-as-a-user-i-should-be-able-to-see-the-feed
  handleFollow = (id) => {
    this.setState((state) => ({
      feed: state.map((product) => product.user_id === id
        ? {
          ...product,
          // This property is not included in the feed property.
          // But, we'll use the API's property naming convention
          // for consistency among the other features/pages.
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

    const query = qs.stringify({
      ...state.filters,
      start: offset,
      end: offset + 19,
      type: 1
    });

    return axios.get(`/user/${props.auth.id}/feed/posts?${query}`)
      .then((res) => {
        this.setState({
          feed: res.data.map((product) => ({
            ...product,
            // @TODO: Remove based on discussion over
            // https://trello.com/c/1UFlbWMW/21-as-a-user-i-should-be-able-to-see-the-feed
            is_followed: true
          })),
          loading: false,
          offset: offset + 20
        });

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
