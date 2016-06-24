import config from 'app/config';

/**
 * Get the s3 asset coming from the API
 *
 * @example getS3Img('gocart', 'xZsdW2')
 *
 * @param {string} username
 * @param {string} filename
 * @return {string}
 */
export default function getS3Img(username, filename) {
  return `${config.assets.s3}/${username}/${filename}.jpg`;
}
