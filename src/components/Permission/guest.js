import {resolve, context} from 'react-resolver';
import history from 'app/history';

function guest(Component) {
  // @NOTE
  // Temporarily since we're dealing with static pages
  return Component;

  const ResolvedComponent = resolve('_temp_guest_', ({store}) => {
    if ( store.getState().auth.token != null ) {
      return history.push('/');
    }
  })(Component);

  return context('store')(ResolvedComponent);
}

export default guest;
