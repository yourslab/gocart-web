/**
 * Scrolls node to bottom
 *
 * @param {DOMElement} node
 */
export default function(node) {
  node.scrollTop = node.scrollHeight;
}
