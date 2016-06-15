import numeral from 'numeral';

/**
 * Formats given amount to money format
 *
 * @param {number} amount
 * @return string
 */
export default function formatCurrency(amount) {
  return numeral(amount).format('0,0.00');
}
