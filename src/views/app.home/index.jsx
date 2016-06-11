import React, {PropTypes} from 'react';
import axios from 'axios';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import Helmet from 'react-helmet';
import {Gateway} from 'react-gateway';
import Infinite from 'app/components/Infinite';
import ProductCard from 'app/components/ProductCard';
import Filters from './components/Filters';

class AppHomeView extends React.Component {
  state = {
    feed: [{}, {}, {}, {}],
    loading: false,
    error: false
  };

  render() {
    const feed = map(
      groupBy(toPairs(this.state.feed), ([i]) => i % 2 === 0 ? i : i - 1),
      (set) => [set[0][1], set[1][1]]
    );

    return (
      <div className="Container">
        <Helmet title="Home" />

        <div className="u-spacer-large">
          <Infinite callback={this.handleRequest}>
            {feed.map((set, i) =>
              <div className="Grid" key={i}>
                {set.map((product, j) =>
                  <div className="Grid-cell u-size6 u-spacer-large" key={j}>
                    <ProductCard />
                  </div>
                )}
              </div>
            )}
          </Infinite>
        </div>

        {this.state.loading ? <div className="Spinner u-spacer-large" /> : null }

        <Gateway into="header-separator">
          <div className="MainHeader-separator" />
        </Gateway>

        <Gateway into="header-filters">
          <button className="MainHeader-button" onClick={() => this.refs.filters.open()}>More Filters</button>
        </Gateway>

        <Filters ref="filters" />
      </div>
    );
  }

  handleRequest = () => {
    if ( this.state.loading ) {
      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    setTimeout(() => {
      this.setState((state) => ({
        feed: [...state.feed, {}, {}],
        loading: false
      }));
    }, 1500);

    // return axios.get('/user/2/feed/posts/1/2')
    //   .then((res) => {
    //     this.setState({
    //       feed: res.data,
    //       loading: false
    //     });

    //     return res;
    //   })
    //   .catch((res) => {
    //     this.setState({
    //       loading: false,
    //       error: true
    //     });

    //     return Promise.reject(res);
    //   });
  }
}

export default AppHomeView;
