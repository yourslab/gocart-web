import React, { Component } from 'react';
import qs from 'qs';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import isServerError from 'app/utils/isServerError';
import Infinite from 'app/components/Infinite';
import ProductCard from './components/ProductCard';
import EmptyResults from './components/EmptyResults';

class AppSearchPostsView extends Component {
  state = {
    feed: [],
    offset: 0,
    loading: false,
    error: false,
    last: false,
    message: ''
  };

  componentDidMount() {
    this.request();
  }

  componentWillReceiveProps({location}) {
    if ( this.props.location.query.q === location.query.q ) {
      return;
    }

    this.request(location.query.q);
  }

  render() {
    const {feed, loading} = this.state;

    if ( !loading && !feed.length ) {
      return <EmptyResults />;
    }

    return (
      <div>
        <Infinite callback={this.request}>
          <div className="Grid">
            {feed.map((product, i) =>
              <ProductCard key={i} product={product} />
            )}
          </div>
        </Infinite>

        {loading ? <div className="Spinner u-spacer-base" /> : null}
      </div>
    );
  }

  request = (search = this.props.location.query.q) => {
    const offset = search === this.props.location.query.q ? this.state.offset : 0;

    if ( this.state.loading || (offset !== 0 && this.state.last) ) {
      return;
    }

    this.setState({
      loading: true,
      error: false,
      message: '',
      last: false
    });

    const query = qs.stringify({
      start: offset,
      end: offset + 19,
      type: 3,
      search_string: search,
    });

    return axios.get(`/user/${this.props.auth.id}/feed/posts?${query}`)
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
        } else {
          this.setState((state) => ({
            // If we there are 0 results for the
            // new query, empty the array.
            feed: offset === 0 ? [] : state.feed,
            loading: false,
            last: true
          }));
        }

        return Promise.reject(res);
      });
  }
}

const mapState = ({auth}) => ({ auth: auth.user });
export default connect(mapState)(AppSearchPostsView);
