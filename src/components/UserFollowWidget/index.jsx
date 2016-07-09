import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import StaticImg from 'app/components/StaticImg';

/**
 * A reusable "follow" widget intended
 * for use with ProductCard.
 *
 * @todo Fix data not syncing: We can fix this
 * by putting the loading to the consuming component
 * instead of here (in short: remove loading state;
 * make it into a prop)
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
    loading: false,
    hovered: false
  };

  render() {
    const {loading, hovered} = this.state;

    if ( this.props.user.id === this.props.auth.id ) {
      return null;
    }

    if ( loading ) {
      return <div className="Spinner"
        onMouseOver={this.handleHover}
        onMouseOut={this.handleOut} />;
    }

    return (
      <button type="button" className="PlainBtn"
        onMouseOver={this.handleHover}
        onMouseOut={this.handleOut}
        onClick={this.handle}>
        {this.props.user.is_followed
          ? <StaticImg src={`icons/${hovered ? 'unfollow.svg' : 'followed.svg'}`} alt="Unfollow" title="Unfollow" />
          : <StaticImg src={`icons/${hovered ? 'follow_hover.svg' : 'follow.svg'}`} alt="Follow" title="Follow" />}
      </button>
    );
  }

  handle = () => {
    this.setState({ loading: true });

    const {user, auth} = this.props;

    return this.request({
        to_user: user.id,
        from_user: auth.id
      })
      .then((res) => {
        this.setState({ loading: false });
        this.props.onFollow(user.id);
        return res;
      })
      .catch((res) => {
        this.setState({ loading: false });
        return Promise.reject(res);
      });
  }

  request(data) {
    return this.props.user.is_followed
      ? axios.delete('/user/follow/', { data })
      : axios.post('/user/follow/', data);
  }

  handleHover = () => {
    this.setState({ hovered: true });
  }

  handleOut = () => {
    this.setState({ hovered: false });
  }
}

export default connect((state) => ({ auth: state.auth.user }))(UserFollowWidget);
