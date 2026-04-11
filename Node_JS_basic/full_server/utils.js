import fs from 'fs';

const readDatabase = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    if (lines.length <= 1) {
      resolve({});
      return;
    }

    const students = lines.slice(1);
    const fields = {};

    for (const student of students) {
      const studentData = student.split(',');
      const firstName = studentData[0];
      const field = studentData[3];

      if (field) {
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstName);
      }
    }
    resolve(fields);
  });
});

export default readDatabase;
