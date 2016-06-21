import React, { Component } from 'react';
import qs from 'qs';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Infinite from 'app/components/Infinite';
import ProductCard from './components/ProductCard';
import EmptyResults from './components/EmptyResults';

class AppSearchPostsView extends Component {
  state = {
    feed: [],
    offset: 0,
    loading: false,
    error: false,
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
            {feed.map((product, i) => <ProductCard key={i} product={product} />)}
          </div>
        </Infinite>

        {loading ? <div className="Spinner u-spacer-base" /> : null}
      </div>
    );
  }

  request = (search = this.props.location.query.q) => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false,
      message: ''
    });

    const append = search === this.props.location.query.q;
    const offset = append ? this.state.offset : 0;


    const query = qs.stringify({
      start: offset,
      end: offset + 19,
      type: 3,
      search_string: search
    });

    return axios.get(`/user/${this.props.auth.id}/feed/posts?${query}`)
      .then((res) => {
        this.setState((state) => ({
          feed: append ? [...state.feed, res.data] : res.data,
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


const mapState = ({auth}) => ({ auth: auth.user });
export default connect(mapState)(AppSearchPostsView);
