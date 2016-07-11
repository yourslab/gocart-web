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

  // Handle route change.
  // @TODO: If possible, make an abstraction that does this for us.
  // Set initial state to props; on update, set state to nextProps.
  componentWillReceiveProps(nextProps) {
    if ( this.props.user === nextProps.user ) {
      return;
    }

    this.handleRequest(nextProps.user);
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
              <ProductCard
                key={`product-${i}`}
                product={product}
                onBump={this.handleBump}  />
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

  handleBump = (id) => {
    this.setState(({products}) => ({
      products: products.map((product) => product.id === id
        ? {
          ...product,
          is_liked: !product.is_liked,
          num_likes: product.num_likes + (product.is_liked ? -1 : 1)
        } : product)
    }));
  }

  handleRequest = (user = this.props.user) => {
    const offset = user === this.props.user ? this.state.offset : 0;

    if ( this.state.loading || (offset !== 0 && this.state.last) ) {
      return;
    }

    this.setState((state) => ({
      loading: true,
      error: '',
      // On route change, remove all products.
      // Offset becomes 0 on route change.
      products: offset === 0 ? [] : state.products,
      last: false
    }));

    const query = qs.stringify({
      start: offset,
      end: offset + 19,
      type: 1,
      viewer_id: this.props.auth.id
    });

    return axios.get(`/user/${user.id}/posts?${query}`)
      .then((res) => {
        this.setState((state) => ({
          products: offset === 0
            ? res.data
            : [...state.products, ...res.data],
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
