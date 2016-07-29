import last from 'lodash/last';

/**
 * Formats entries into a string of comma-separated items
 *
 * @param {string[]} entries
 * @return string
 */
export default function connectOxfordItems(entries) {
  return entries.length === 1
  ? entries[0]
  : (entries.length === 2
      ? entries.join(' and ')
      : `${entries.slice(0, -1).join(', ')}, and ${last(entries)}`);
}
