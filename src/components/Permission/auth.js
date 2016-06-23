import {resolve, context} from 'react-resolver';
import history from 'app/history';

function auth(Component) {
  const ResolvedComponent = resolve('_temp_guest_', ({store}) => {
    if ( store.getState().auth.token == null ) {
      return history.push('/login');
    }
  })(Component);

  return context('store')(ResolvedComponent);
}

export default auth;
