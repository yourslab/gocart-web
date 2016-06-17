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
    feed: [{}, {}, {}, {}],
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
                  <ProductCard product={product} />
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
          feed: res.data,
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
