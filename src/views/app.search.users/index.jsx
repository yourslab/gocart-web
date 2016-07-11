import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import Infinite from 'app/components/Infinite';
import UserCard from './components/UserCard';
import EmptyResults from './components/EmptyResults';

export default class AppSearchUsersView extends Component {
  state = {
    feed: [],
    offset: 0,
    loading: false,
    last: false,
    message: ''
  };

  componentDidMount() {
    this.request();
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.location.query.q === nextProps.location.query.q ) {
      return;
    }

    this.request(nextProps.location.query.q);
  }

  render() {
    const {feed, loading} = this.state;

    if ( !loading && !feed.length ) {
      return <EmptyResults />;
    }

    return (
      <div>
        <Infinite callback={this.request}>
          <div className="Grid u-spacer-base">
            {feed.map((user, i) => <UserCard user={user} key={i} />)}
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
      message: ''
    });

    return axios.get(`/user/search/${search}?start=${offset}&end=${offset + 19}`)
      .then((res) => {
        this.setState((state) => ({
          feed: offset === 0
            ? res.data
            : [...state.feed, ...res.data],
          offset: offset + 20,
          loading: false
        }));

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
            loading: false,
            message: lang.errors.server
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
      })
  }
}
