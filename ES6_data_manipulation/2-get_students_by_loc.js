/**
 * Filters a list of students by a specific location.
 * @param {Array} students - The list of student objects.
 * @param {String} city - The city to filter by.
 * @returns {Array} An array of objects located in the specific city.
 */
export default function getStudentsByLocation(students, city) {
  return students.filter((student) => student.location === city);
}
