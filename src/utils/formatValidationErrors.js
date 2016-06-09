import upperFirst from 'lodash/upperFirst';

/**
 * - Transforms the API's validation messages
 * into a more intuitive format
 *
 * - Improving the message by uppercasing
 * the first letter and appending a period
 *
 * @param {object} errors
 * @return {object}
 */
export default function format(errors) {
  const result = {};

  errors.forEach((error) => {
    result[error.name] = `${upperFirst(error.description)}.`;
  });

  return result;
}
