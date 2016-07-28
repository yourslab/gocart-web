/**
 * Returns plural string if length != 1
 *
 * @param {number} amount
 * @return string
 */
export default function pluralizer(string, length) {
  return length === 1 ? string : `${string}s`;
}