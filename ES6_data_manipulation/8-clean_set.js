/**
 * Returns a string of set values that start with a specific string,
 * appending only the rest of the string.
 * @param {Set} set - The set of strings to process.
 * @param {String} startString - The prefix to look for.
 * @returns {String} A string of values separated by '-'.
 */
export default function cleanSet(set, startString) {
  // Check if startString is valid and not empty
  if (!startString || typeof startString !== 'string') {
    return '';
  }

  const parts = [];

  for (const value of set) {
    // Ensure value is a string and starts with the prefix
    if (typeof value === 'string' && value.startsWith(startString)) {
      // Extract the rest of the string after the prefix
      parts.push(value.slice(startString.length));
    }
  }

  return parts.join('-');
}
