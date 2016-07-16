import numeral from 'numeral';

/**
 * Formats given amount to money format
 *
 * @param {number} amount
 * @return string
 */
export default function formatCurrency(amount) {
  // \u20B1 = peso sign = ₱
  return `\u20B1 ${numeral(amount).format('0,0')}`;
}
