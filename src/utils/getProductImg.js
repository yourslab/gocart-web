import config from 'app/config';

/**
 * Build full url of the product img coming from the API
 *
 * @example getProductImg(product.id, product.photo_list[i])
 *
 * @param {string} username
 * @param {string} filename
 * @return {string}
 */
export default function getProductImg(id, filename) {
  return `${config.assets.s3}/posts/${id}/${filename}.jpg`;
}
