const http = require('http');
const fs = require('fs');

const DB_FILE = process.argv[2];

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

    // ترتيب الحقول يفضل أن يكون ثابتاً (اختياري لكن يساعد في الاختبارات)
    const sortedFields = Object.keys(fields).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    for (const field of sortedFields) {
      output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
    }
    resolve(output);
  });
});

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const responseHeader = 'This is the list of our students\n';
    countStudents(DB_FILE)
      .then((data) => {
        res.end(`${responseHeader}${data}`);
      })
      .catch((err) => {
        // تأكد من أن رسالة الخطأ تظهر تماماً كما هي مطلوبة بعد الهيدر
        res.end(`${responseHeader}${err.message}`);
      });
  }
});

app.listen(1245);

module.exports = app;
