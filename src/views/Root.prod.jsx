import React, { PropTypes } from 'react';
import {Provider} from 'react-redux';
import {Router, applyRouterMiddleware} from 'react-router';
import scroll from 'react-router-scroll';
import Helmet from 'react-helmet';
import routes from 'app/routes';
import config from 'app/config';

class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Helmet
          defaultTitle={`${config.app.title}`}
          titleTemplate={`%s - ${config.app.title}`} />

        <Provider store={this.props.store}>
          <Router history={this.props.history} render={applyRouterMiddleware(scroll())}>
            {routes}
          </Router>
        </Provider>
      </div>
    );
  }
}

export default Root;
