/**
 * Extracts IDs from a list of student objects.
 * @param {Array} listStudents - An array of student objects.
 * @returns {Array} An array of IDs or an empty array if the input is invalid.
 */
export default function getListStudentIds(listStudents) {
  if (!Array.isArray(listStudents)) {
    return [];
  }

  return listStudents.map((student) => student.id);
}
