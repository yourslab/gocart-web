/**
 * Workaround for the `photos` property inconsistency.
 * @see https://github.com/yourslab/gocart-restapi/issues/21
 *
 * Useful for reusable components.
 *
 * @param {object} product Product data
 * @return {array}
 */
export default function getProductPhotos(product) {
  return product.photos || product.photo_list;
}
