import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import axios from 'axios';
import qs from 'qs';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import Infinite from 'app/components/Infinite';
import ProductCard from './components/ProductCard';
import StaticImg from 'app/components/StaticImg';

class AppProfileHomeView extends Component {
  state = {
    products: [],
    offset: 0,
    loading: false,
    last: false,
    error: ''
  };

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    // Both come from `app.profile` route.
    const {auth, user} = this.props;
    const {products, loading} = this.state;

    return (
      <div>
        <Helmet title={user.name} />

        <Infinite callback={this.handleRequest}>
          <div className="Grid">
            {products.map((product, i) =>
              <ProductCard product={product} key={`product-${i}`} />
            )}

            {auth.id === user.id
              ? <div className="Grid-cell u-size6 u-spacer-base">
                  <Link to="/manage-posts/create" className="BlankSlate">
                    <StaticImg src="/icons/post_icon@1x.png" />
                    <h1> Add Post </h1>
                  </Link>
                </div>
              : null}
          </div>
        </Infinite>

        {loading ? <div className="Spinner u-spacer-large" /> : null}
      </div>
    );
  }

  handleRequest = (offset = this.state.offset) => {
    if ( this.state.loading || this.state.last ) {
      return;
    }

    this.setState({
      loading: true,
      error: ''
    });

    const {state, props} = this;

    const query = qs.stringify({
      start: offset,
      end: offset + 19,
      type: 1
    });

    return axios.get(`/user/${props.user.id}/posts?${query}`)
      .then((res) => {
        this.setState((state) => ({
          products: [...state.products, ...res.data],
          loading: false,
          offset: offset + 20
        }));

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState({
            loading: false,
            error: lang.errors.server
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

export default AppProfileHomeView;
