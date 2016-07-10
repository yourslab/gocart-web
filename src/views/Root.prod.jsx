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
          titleTemplate={`%s - ${config.app.title}`}
          meta={[
            { property: 'og:image', content: '//about.gocart.ph/images/og_image.png' },
            { property: 'og:title', content: config.app.siteline },
            { property: 'og:site_name', content: 'gocart.ph' },
            { property: 'og:description', content: config.app.description },
            { name: 'description', content: config.app.description },
          ]} />

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
