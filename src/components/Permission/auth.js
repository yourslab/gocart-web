import {resolve, context} from 'react-resolver';
import config from 'app/config';
import history from 'app/history';

function auth(Component) {
  const ResolvedComponent = resolve('_temp_guest_', ({store, location}) => {
    if ( store.getState().auth.token == null ) {
      if ( location.pathname === '/' ) {
        history.push('/login');
      } else {
        history.push(`/login?${config.routing.redirectKey}=${encodeURIComponent(location.pathname)}`);
      }

      // So the next `resolve`s never execute
      return new Promise(() => {});
    }
  })(Component);

  return context('store')(ResolvedComponent);
}

export default auth;
