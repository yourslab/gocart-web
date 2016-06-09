import axios from 'axios';
import cookie from 'cookie-machine';
import config from 'app/config';

axios.interceptors.request.use(function(request) {
  if ( !/user\/(email_token|fb_token)/.test(request.url) ) {
    const auth = cookie.get(config.auth.key);

    if ( auth != null ) {
      request.headers['auth-token'] = `${auth.token}`;
    }
  }

  return request;
}, function(err) {
  return Promise.reject(err);
});
