/**
 * Retrieves a list of student objects.
 * @returns {Array} An array of objects containing id, firstName, and location.
 */
export default function getListStudents() {
  return [
    { id: 1, firstName: 'Guillaume', location: 'San Francisco' },
    { id: 2, firstName: 'James', location: 'Columbia' },
    { id: 5, firstName: 'Serena', location: 'San Francisco' },
  ];
}
