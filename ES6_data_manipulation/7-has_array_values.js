/**
 * Checks if all elements in an array exist within a set.
 * @param {Set} set - The set to check against.
 * @param {Array} array - The array of values to look for.
 * @returns {Boolean} True if all elements in the array are in the set, false otherwise.
 */
export default function hasValuesFromArray(set, array) {
  return array.every((value) => set.has(value));
}
