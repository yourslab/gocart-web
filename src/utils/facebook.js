import config from 'app/config';

/**
 * Facebook API Helper
 *
 * @todo Improve to a more high-level helper
 * @todo Make application-agnostic
 * @source http://stackoverflow.com/a/35603217/2698227
 */
const facebook = {
  init() {
    return new Promise((resolve) => {
      if ( typeof window.FB !== 'undefined' ) {
        console.warn('Facebook has already been resolved!');
        resolve();
      }

      window.fbAsyncInit = () => {
        FB.init({
          appId: config.facebook.appId,
          cookie: true,
          xfbml: true,
          version: 'v2.3'
        });

        resolve();
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = process.env.NODE_ENV === 'production' && !process.env.FACEBOOK_DEBUG
          ? '//connect.facebook.net/en_US/sdk.js'
          : '//connect.facebook.net/en_US/sdk/debug.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });
  },

  login() {
    warn();

    return new Promise((resolve, reject) => {
      FB.login((response) => {
        response.status === 'connected'
          ? resolve(response)
          : reject(response);
      }, { scope: 'user_friends' });
    });
  },

  check() {
    warn();

    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        response.status === 'connected' ? resolve(response) : reject(response);
      });
    });
  },

  fetch() {
    warn();

    return new Promise((resolve, reject) => {
      FB.api(
        '/me',
        (response) => response.error ? reject(response) : resolve(response)
      );
    });
  },

  token() {
    warn();

    return FB.getAccessToken();
  }
};

function warn(reject) {
  if ( typeof window.FB === 'undefined' ) {
    throw new Error('Facebook has not yet been initialized.');
  }
}

export default facebook;
