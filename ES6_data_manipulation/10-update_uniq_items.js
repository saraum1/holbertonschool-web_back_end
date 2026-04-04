/**
 * Updates a map of groceries by changing quantities of 1 to 100.
 * @param {Map} map - The map to update.
 * @returns {Map} The updated map.
 * @throws {Error} If the argument is not a Map.
 */
export default function updateUniqueItems(map) {
  // Check if the argument is an instance of Map
  if (!(map instanceof Map)) {
    throw new Error('Cannot process');
  }

  // Iterate through the map
  map.forEach((quantity, item) => {
    // If the quantity is exactly 1, update it to 100
    if (quantity === 1) {
      map.set(item, 100);
    }
  });

  return map;
}
