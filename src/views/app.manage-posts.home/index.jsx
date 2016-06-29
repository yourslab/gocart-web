import React, {Component} from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import lang from 'app/lang';
import Infinite from 'app/components/Infinite';
import ProductCard from './components/ProductCard';

export default class AppManagePostshomeView extends Component {
  state = {
    feed: [],
    offset: 0,
    loading: false,
    message: ''
  };

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    const {feed, loading} = this.state;

    return (
      <div>
        <Helmet title="Manage Posts" />

        <div className="SidebarContainer-panelHeading">
          <div />

          <div className="SidebarContainer-panelHeadingSection">
            <div className="SidebarContainer-panelHeadingSectionItem">
              <a href="#" className="Btn Btn--primary Btn--inverted Btn--borderless">Delete All</a>
            </div>
          </div>
        </div>

        <Infinite callback={this.handleRequest}>
          <div className="Grid">
            {feed.map((product, i) =>
              <ProductCard product={product} key={i} />
            )}
          </div>
        </Infinite>

        {loading ? <div className="Spinner" /> : null}
      </div>
    );
  }

  handleRequest = () => {
    const {feed, offset, loading} = this.state;

    if ( loading ) {
      return;
    }

    this.setState({
      loading: true,
      message: ''
    });

    return axios.get(`/user/1/posts?start=${offset}&end=${offset + 19}`)
      .then((res) => {
        this.setState({
          feed: [...feed, ...res.data],
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
      });
  }
}
