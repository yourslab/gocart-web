import React, { Component } from 'react';
import {Link} from 'react-router';
import Infinite from 'app/components/Infinite';
import StaticImg from 'app/components/StaticImg';
import ProductCard from './components/ProductCard';

export default class AppSearchPostsView extends Component {
  state = {
    feed: [{}, {}, {}, {}],
    loading: false,
    error: false,
    message: ''
  };

  render() {
    const {feed, loading} = this.state;

    return (
      <Infinite callback={this.request}>
        <div className="Grid">
          {feed.map((_, i) => <ProductCard key={i} />)}
        </div>
      </Infinite>
    );
  }

  request = () => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({ loading: true });

    setTimeout(() => {
      this.setState((state) => ({
        feed: [...state.feed, {}, {}, {}, {}, {}, {}],
        loading: false
      }))
    }, 250);
  }
}
