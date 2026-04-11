import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const dbFile = process.argv[2];
    readDatabase(dbFile)
      .then((fields) => {
        let output = 'This is the list of our students';
        const sortedFields = Object.keys(fields).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        for (const field of sortedFields) {
          output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        }
        return response.status(200).send(output);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    const dbFile = process.argv[2];
    return readDatabase(dbFile)
      .then((fields) => {
        if (fields[major]) {
          return response.status(200).send(`List: ${fields[major].join(', ')}`);
        }
        return response.status(200).send('List: ');
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }
}

export default StudentsController;
