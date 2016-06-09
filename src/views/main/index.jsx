import React from 'react';
import {resolve} from 'react-resolver';
import store from 'app/store';
import {getData} from 'app/modules/auth';

class Main extends React.Component {
  render() {
    return this.props.children;
  }
}

export default resolve('_auth_temp_', () =>
  store.get().dispatch(getData())
)(Main);
