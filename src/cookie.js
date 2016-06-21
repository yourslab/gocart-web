import cookie from 'cookie-machine';
import merge from 'lodash/merge';

/**
 * An ad-hoc transformer that
 * stringifies `set` and parses `get`
 *
 * @todo Open-source
 */
export default merge({}, cookie, {
  get(key) {
    const value = cookie.get(key);
    return value ? JSON.parse(value) : value;
  },

  set(key, value, opts) {
    return cookie.set(key, JSON.stringify(value), opts);
  }
});
