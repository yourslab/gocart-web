/**
 * Remove Base64 Prefix (for API)
 *
 * @param {string} b64 base64 representation
 * @return string
 */
export default function removeBase64Prefix(b64) {
  const [prefix, ...data] = b64.split(',');
  return data.join(',')
}
