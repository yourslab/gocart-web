import axios from 'axios';
import isAbsolute from 'is-absolute-url';
import cookie from 'app/cookie';
import config from 'app/config';

// Interceptors that includes the `auth-token` header
axios.interceptors.request.use(function(request) {
  // Our auth doesn't need it, and we won't have the token
  // anyway haha, obviously, when requesting them.
  // Google Maps also doesn't allow the header, but we
  // most likely won't need to pass them in absolute urls
  if ( !/user\/(email_token|fb_token)/.test(request.url) && !isAbsolute(request.url) ) {
    const auth = cookie.get(config.auth.key);

    if ( auth != null ) {
      request.headers['auth-token'] = `${auth.token}`;
    }
  }

  return request;
}, function(err) {
  return Promise.reject(err);
});
