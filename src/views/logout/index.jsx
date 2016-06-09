import React, {PropTypes} from 'react';
import store from 'app/store';
import {logout} from 'app/modules/auth';

class LogoutView extends React.Component {
  componentDidMount() {
    store.get().dispatch(logout());
  }

  render() {
    return <div />;
  }
}

export default LogoutView;
