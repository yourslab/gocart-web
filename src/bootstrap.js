// Import all utils that needs to be initialized
import config from './config';

// Global handler for promise rejections or errors
if ( process.env.NODE_ENV !== 'production' ) {
  global.onunhandledrejection = function({reason}) {
    console.error(reason, reason.stack);
  }

  console.log('GoCart: You are in development mode!');

  let app = global.app = {
    config: require('./config').default,
    axios: require('axios'),
    cookie: require('cookie-machine'),
    history: require('./history').default,
    store: require('app/store').default
  };
}

// Initialize workaround for scrollbars
document.addEventListener('DOMContentLoaded', () => {
  require('scrollbar-compensate')('.ReactModal__Body--open');
});

import './utils/axios/interceptors/base';
import './utils/axios/interceptors/auth';
