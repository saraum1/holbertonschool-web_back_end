/**
 * Returns a Map of groceries with their quantities.
 * @returns {Map<string, number>} A Map containing grocery items and quantities.
 */
export default function groceriesList() {
  const groceries = new Map([
    ['Apples', 10],
    ['Tomatoes', 10],
    ['Pasta', 1],
    ['Rice', 1],
    ['Banana', 5],
  ]);

  return groceries;
}
