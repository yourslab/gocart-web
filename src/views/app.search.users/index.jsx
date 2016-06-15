import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import lang from 'app/lang';
import Infinite from 'app/components/Infinite';
import StaticImg from 'app/components/StaticImg';
import UserCard from './components/UserCard';

export default class AppSearchUsersView extends Component {
  state = {
    feed: [],
    offset: 0,
    loading: false,
    message: ''
  };

  componentDidMount() {
    this.request();
  }

  componentWillReceiveProps(props) {
    this.request(0);
  }

  render() {
    const {feed, loading} = this.state;

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

  request = (offset = this.state.offset) => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      message: ''
    });

    const query = this.props.location.query.q;

    return axios.get(`/user/search/${query}?start=${offset}&end=${offset + 19}`)
      .then((res) => {
        this.setState({
          feed: [...this.state.feed, ...res.data],
          offset: offset + 20,
          loading: false
        });

        return res;
      })
      .catch((res) => {
        this.setState({
          loading: false,
          message: lang.errors.server
        });

        return Promise.reject(res);
      })
  }
}
