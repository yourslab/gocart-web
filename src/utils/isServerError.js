/**
 * Checks if there were connection issues
 * with the server.
 *
 * @example
 * isServerError(500) // true
 * isServerError(0) // true
 * isServerError(422) // false
 *
 * @param {number} status
 * @return bool
 */
export default function isServerError(status) {
  return status === 0 || status >= 500;
}
