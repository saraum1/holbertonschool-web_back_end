/**
 * Calculates the sum of all student IDs.
 * @param {Array} students - The list of student objects.
 * @returns {Number} The total sum of the IDs.
 */
export default function getStudentIdsSum(students) {
  return students.reduce((sum, student) => sum + student.id, 0);
}
