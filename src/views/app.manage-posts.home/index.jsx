import React, {Component} from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import lang from 'app/lang';
import isServerError from 'app/utils/isServerError';
import formatValidationErrors from 'app/utils/formatValidationErrors';
import Infinite from 'app/components/Infinite';
import ProductCard from './components/ProductCard';
import EditPostForm from './components/EditPostForm';

class AppManagePostsHomeView extends Component {
  state = {
    feed: {
      data: [],
      offset: 0,
      loading: false,
      message: ''
    },

    update: {
      data: {},
      editing: false,
      loading: false,
      errors: {},
      message: ''
    },

    del: {
      id: 0,
      loading: false,
      message: ''
    }
  };

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    const {auth} = this.props;
    const {feed, update} = this.state;

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
            {feed.data.map((product, i) =>
              <ProductCard
                product={product}
                onEdit={this.handleEdit}
                key={i} />
            )}
          </div>
        </Infinite>

        {feed.loading ? <div className="Spinner" /> : null}

      <EditPostForm
        state={update}
        product={update.data}
        auth={auth}
        onCancelEdit={this.handleCancelEdit}
        onUpdate={this.handleUpdate}
        onUpload={this.handleUpload} />
      </div>
    );
  }

  handleRequest = () => {
    const {loading, offset} = this.state.feed;

    if ( loading ) {
      return;
    }

    this.setState(({feed}) => ({
      feed: {
        ...feed,
        loading: true,
        message: ''
      }
    }));

    return axios.get(`/user/${this.props.auth.id}/posts?start=${offset}&end=${offset + 19}`)
      .then((res) => {
        this.setState(({feed}) => ({
          feed: {
            ...feed,
            data: [...feed.data, ...res.data],
            offset: offset + 20,
            loading: false
          }
        }));

        return res;
      })
      .catch((res) => {
        this.setState(({feed}) => ({
          feed: {
            ...feed,
            loading: false,
            message: lang.errors.server
          }
        }));

        return Promise.reject(res);
      });
  }

  handleEdit = (id) => {
    this.setState((state) => ({
      update: {
        ...state.update,
        data: state.feed.data.find((product) => product.id === id),
        editing: true
      }
    }));
  }

  handleCancelEdit = (id, data) => {
    this.setState(({update}) => ({
      update: {
        ...update,
        data: {},
        editing: false
      }
    }));
  }

  handleUpdate = (data) => {
    if ( this.state.update.loading ) {
      return;
    }

    this.setState(({update}) => ({
      update: {
        ...update,
        loading: true,
        errors: {},
        message: ''
      }
    }));

    return axios.put(`/post/${this.state.update.data.id}`, {
        ...data,
        user_id: this.props.auth.id
      })
      .then((res) => {
        this.setState((state) => ({
          feed: {
            ...state.feed,
            data: state.feed.data.map((product) => product.id === this.state.update.data.id
              ? {
                ...product,
                ...data
              } : product)
          },

          update: {
            ...state.update,
            loading: false,
            editing: false
          }
        }));

        return res;
      })
      .catch((res) => {
        if ( isServerError(res.status) ) {
          this.setState(({update}) => ({
            update: {
              ...state,
              loading: false,
              message: lang.errors.server
            }
          }));
        } else {
          this.setState(({update}) => ({
            update: {
              ...update,
              loading: false,
              errors: formatValidationErrors(res.data.errors),
              message: lang.errors.input
            }
          }));
        }

        return Promise.reject(res);
      });
  }

  // @NOTE: We'll require the `id` instead of using
  // the data in `state.update` because it is possible
  // to close the modal while updating the list of photos.
  handleUpload = (id, photos) => {
    const updated = {
      ...this.state.feed.data.find((product) => product.id === id),
      photo_list: photos
    };

    this.setState((state) => ({
      feed: {
        ...state.feed,
        data: state.feed.data.map((product) => product.id === id
          ? updated
          : product)
      },

      update: {
        ...state.update,
        data: updated
      }
    }));
  }
}

export default connect((state) => ({ auth: state.auth.user }))(AppManagePostsHomeView);
