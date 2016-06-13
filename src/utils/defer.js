/**
 * Defers the execution of a callback.
 *
 * @param {function} callback
 * @param {number} ms
 */
export default function defer(callback, ms) {
  let timeout = null;

  return function(...args) {
    if ( timeout ) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, ms);
  }
}
