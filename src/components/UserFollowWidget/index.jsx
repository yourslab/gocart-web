import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import StaticImg from 'app/components/StaticImg';

/**
 * A reusable "follow" widget intended
 * for use with ProductCard.
 */
class UserFollowWidget extends Component {
  static propTypes = {
    // We'll use a shape since the API doesn't wrap
    // the user in an object.
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      // In some end points, this is not included,
      // so map data if necessary
      is_followed: PropTypes.bool.isRequired
    }).isRequired,

    onFollow: PropTypes.func.isRequired
  };

  state = {
    loading: false
  };

  render() {
    if ( this.state.loading ) {
      return null;
    }

    return (
      <button type="button" className="PlainBtn" onClick={this.handle}>
        {this.props.user.is_followed
          ? <StaticImg src="icons/unfollow.svg" alt="Unfollow" />
          : <StaticImg src="icons/follow_icon@1x.png" alt="Follow" />}
      </button>
    );
  }

  handle = () => {
    this.setState({ loading: true });

    const {user} = this.props;
    const method = user.is_followed ? 'delete' : 'post';

    return this.request({
        to_user: this.props.user.id,
        from_user: this.props.auth.id
      })
      .then((res) => {
        this.setState({ loading: false });
        this.props.onFollow(this.props.user.id);
        return res;
      })
      .catch((res) => {
        this.setState({ loading: false });
        return Promise.reject(res);
      });
  }

  request(data) {
    return this.props.user.is_followed
      ? axios.delete('/user/follow', { data })
      : axios.post('/user/follow', data);
  }
}

export default connect((state) => ({ auth: state.auth.user }))(UserFollowWidget);
