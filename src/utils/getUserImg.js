import config from 'app/config';

/**
 * Get the user's avatar
 *
 * @example getUserImg(product.username, product.photo_list[0])
 *
 * @param {string} username
 * @param {string} filename
 * @return {string}
 */
export default function getUserImg(username, filename) {
  return `${config.assets.s3}/${username}/${filename}.jpg`;
}
