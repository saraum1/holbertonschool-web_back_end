const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const DB_FILE = process.argv[2];

/**
 * Helper function to read and parse student data
 */
const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    if (lines.length <= 1) {
      resolve('Number of students: 0');
      return;
    }

    const students = lines.slice(1);
    let output = `Number of students: ${students.length}`;

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

    const sortedFields = Object.keys(fields).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    for (const field of sortedFields) {
      output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
    }
    resolve(output);
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const responseHeader = 'This is the list of our students\n';
  countStudents(DB_FILE)
    .then((data) => {
      res.send(`${responseHeader}${data}`);
    })
    .catch((err) => {
      res.send(`${responseHeader}${err.message}`);
    });
});

app.listen(port);

module.exports = app;
