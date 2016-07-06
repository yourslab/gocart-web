import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import cn from 'classnames';
import {connect} from 'react-redux';
import StaticImg from 'app/components/StaticImg';

class BumpButton extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      is_liked: PropTypes.bool.isRequired
    }).isRequired,

    onBump: PropTypes.func.isRequired
  };

  state = {
    loading: false
  };

  render() {
    if ( this.state.loading ) {
      return <div className="Spinner" />;
    }

    const {is_liked} = this.props.product;

    return (
      <button
        type="button"
        className={cn('Btn Btn--default Btn--noPadding', { 'Btn--disabled': is_liked })}
        onClick={this.handle}>
        <span className="Btn-icon">
          <StaticImg src={`icons/${is_liked ? 'bump_disabled_icon' : 'bump_icon'}.svg`} />
        </span>

        {is_liked ? 'Unbump' : 'Bump'}
      </button>
    );
  }

  handle = () => {
    if ( this.state.loading ) {
      return;
    }

    const payload = {
      user_id: this.props.auth.id,
      post_id: this.props.product.id
    };

    const request = this.props.product.is_liked
      ? axios.delete('/post/likes', { data: payload })
      : axios.post('/post/likes', payload);

    return request
      .then((res) => {
        this.setState({ loading: false });
        this.props.onBump(this.props.product.id);
        return res;
      })
      .catch((res) => {
        this.setState({ loading: false });
        return Promise.reject(res);
      });
  }
}

export default connect(({auth}) => ({ auth: auth.user }))(BumpButton);
