/**
 * Updates student grades for a specific city.
 * @param {Array} students - The list of students from getListStudents.
 * @param {String} city - The city to filter by.
 * @param {Array} newGrades - Array of grade objects { studentId, grade }.
 * @returns {Array} Array of student objects with their updated grades.
 */
export default function updateStudentGradeByCity(students, city, newGrades) {
  return students
    .filter((student) => student.location === city)
    .map((student) => {
      // Find the grade object for the current student
      const gradeObj = newGrades.find((grade) => grade.studentId === student.id);

      return {
        ...student,
        // If gradeObj exists, use its grade; otherwise, use 'N/A'
        grade: gradeObj ? gradeObj.grade : 'N/A',
      };
    });
}
