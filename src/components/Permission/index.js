import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import auth from './auth';
import guest from './guest';

class Permission extends Component {
  static propTypes = {
    rule: PropTypes.oneOf(['auth', 'guest'])
  };

  static auth = auth;

  static guest = guest;

  render() {
    const {rule, children, auth} = this.props;

    if ( rule === 'auth' && auth.token != null ) {
      return children;
    }

    if ( rule === 'guest' && auth.token == null ) {
      return children;
    }

    return null;
  }
}

const ConnectedPermission = connect(({auth}) => ({ auth }))(Permission);

export {
  ConnectedPermission as default,
  auth,
  guest
};
