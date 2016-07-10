import React, { PropTypes } from 'react';
import {Provider} from 'react-redux';
import {Router, applyRouterMiddleware} from 'react-router';
import scroll from 'react-router-scroll';
import Helmet from 'react-helmet';
import DevTools from 'app/components/DevTools';
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
          titleTemplate={`%s - ${config.app.title} (Dev Mode)`}
          meta={[
            { property: 'og:image', content: '//about.gocart.ph/images/og_image.png' },
            { property: 'og:title', content: config.app.siteline },
            { property: 'og:site_name', content: 'gocart.ph' },
            { property: 'og:description', content: config.app.description },
            { name: 'description', content: config.app.description },
          ]} />

        <Provider store={this.props.store}>
          <div>
              <Router history={this.props.history} render={applyRouterMiddleware(scroll())}>
                {routes}
              </Router>

            {this.renderDevTools()}
          </div>
        </Provider>
      </div>
    );
  }

  renderDevTools() {
    return process.env.REDUX_DEVTOOLS ? <DevTools /> : null;
  }
}

export default Root;
